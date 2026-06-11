import {DeviceNotice, Status} from '@gkct/xiot-core-spec-ts';
import {XcpDeviceClient} from '../XcpDeviceClient';
import {StanzaCodec} from "../../../../stanza/codec/StanzaCodec";
import {IQResult} from "../../../../stanza/typedef/iq/IQResult";
import {IQQuery} from "../../../../stanza/typedef/iq/IQQuery";
import {IQError} from "../../../../stanza/typedef/iq/IQError";
import {Message} from "../../../../stanza/typedef/message/Message";
import {Stanza} from "../../../../stanza/typedef/Stanza";
import {IQ} from "../../../../stanza/typedef/iq/IQ";
import {IQType} from "../../../../stanza/typedef/iq/IQType";

export class XcpDeviceClientBase implements XcpDeviceClient {
  private ws: WebSocket | null = null;

  private readonly did: string;

  private readonly type: string;

  private stanzaCodec: StanzaCodec;

  private resultHandlers: Map<string, (result: IQResult | null, error: IQError | null) => void>;

  private queryHandlers: Map<string, (query: IQQuery) => void>;

  private stanzaId = 1;

  private connectHandler: (result: boolean, e?: any) => void = () => {};

  private disconnectHandler: (e?: any) => void = () => {};

  constructor(
    serialNumber: string,
    productId: string,
    type: string,
  ) {
    this.did = `${serialNumber}@${productId}`;
    this.type = type;
    this.stanzaCodec = new StanzaCodec();
    this.resultHandlers = new Map<string, (result: IQResult | null, error: IQError | null) => void>();
    this.queryHandlers = new Map<string, (query: IQQuery) => void>();
  }

  protected createWebSocket(url: string, options: any): any {
    // this.ws = new WebSocket(url);
    throw Error('createWebSocket not implemented !');
  }

  connect(url: string, options: any): Promise<void> {
    console.log(`connect: ${url}`);

    this.ws = this.createWebSocket(url, options);
    if (this.ws == null) {
      throw Error('new WebSocket Failed!');
    }

    this.ws.addEventListener('open', () => {
      return this.onConnected();
    })

    this.ws.addEventListener('close', e => {
      return this.onDisconnect(e);
    })

    this.ws.addEventListener('error', e => {
      return this.onError(e);
    })

    this.ws.addEventListener('message', e => {
      return this.onReceive(e);
    })

    return new Promise<void>((resolve, reject) => {
      this.connectHandler = (result, e) => {
        if (result) {
          resolve();
          return;
        }

        if (e) {
          reject(e);
        }
      }
    });
  }

  disconnect(): void {
    if (this.ws != null) {
      this.ws.close();
    }
  }

  getDeviceId(): string {
    return this.did;
  }

  getDeviceType(): string {
    return this.type;
  }

  getNextStanzaId(): string {
    return `${Date.now()}#${this.stanzaId++}`;
  }

  addQueryHandler(method: string, handler: (query: IQQuery) => void): void {
    console.log('addQueryHandler: ', method);
    this.queryHandlers.set(method, handler);
  }

  addDisconnectHandler(handler: (e?: any) => void): void {
    this.disconnectHandler = handler;
  }

  sendQuery(query: IQQuery): Promise<IQResult> {
    this.write(this.stanzaCodec.encode(query));
    return new Promise<IQResult>((resolve, reject) => {
      this.resultHandlers.set(query.id, (result, error) => {
        if (error != null) {
          reject(error);
          return;
        }

        if (result == null) {
          return;
        }

        resolve(result);
      });
    });
  }

  sendResult(result: IQResult): void {
    this.write(this.stanzaCodec.encode(result));
  }

  sendError(error: IQError): void {
    this.write(this.stanzaCodec.encode(error));
  }

  sendMessage(message: Message<DeviceNotice>): void {
    this.write(this.stanzaCodec.encode(message));
  }

  private onConnected(): void {
    console.log('onConnected');
    this.connectHandler(true);
  }

  private onDisconnect(e?: any): void {
    console.log('onDisconnect');
    this.ws = null;
    this.disconnectHandler(e);
  }

  private onError(e: Event): void {
    console.log('onError: ', e);
    this.ws = null;
  }

  private onReceive(e: any): void {
    let stanza: Stanza | null = null;

    console.log(`${Date()} recv: `, e.data);
    stanza = this.stanzaCodec.decode(e.data);

    if (stanza == null) {
      return;
    }

    this.handleStanza(stanza);
  }

  private handleStanza(stanza: Stanza) {
    if (stanza instanceof IQ) {
      switch (stanza.type) {
        case IQType.QUERY:
          this.handleQuery(stanza);
          break;

        case IQType.RESULT:
          this.handleResult(stanza);
          break;

        case IQType.ERROR:
          this.handleError(stanza);
          break;

        default:
          console.log('invalid stanza: ', stanza);
          break;
      }
    } else {
      console.log('stanza not IQ: ', stanza);
    }
  }

  private handleQuery(query: IQ) {
    if (!(query instanceof IQQuery)) {
      return;
    }

    const handler = this.queryHandlers.get(query.method);
    if (handler != null) {
      handler(query);
    } else {
      this.sendError(query.error(Status.UNDEFINED, 'Query Handler not found'));
    }
  }

  private handleResult(result: IQ) {
    if (!(result instanceof IQResult)) {
      return;
    }

    const handler = this.resultHandlers.get(result.id);
    if (handler != null) {
      handler(result, null);
      this.resultHandlers.delete(result.id);
    } else {
      console.log('handle for result not found: ', result.id);
    }
  }

  private handleError(error: IQ) {
    if (!(error instanceof IQError)) {
      return;
    }

    const handler = this.resultHandlers.get(error.id);
    if (handler != null) {
      handler(null, error);
      this.resultHandlers.delete(error.id);
    } else {
      console.log('handle for error not found: ', error.id);
    }
  }

  private write(o: Object) {
    const s = JSON.stringify(o);
    console.log(`${Date()} send: `, s);

    if (this.ws != null) {
      this.ws.send(s);
    }
  }
}
