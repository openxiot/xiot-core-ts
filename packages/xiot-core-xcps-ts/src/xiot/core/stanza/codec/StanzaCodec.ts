import { IQCodec } from './IQCodec';
import { MessageCodec } from './MessageCodec';
import { BYEBYE_METHOD } from '../typedef/iq/basic/Byebye';
import { HELLO_METHOD } from '../typedef/iq/basic/Hello';
import { PING_METHOD } from '../typedef/iq/basic/Ping';
import { ByebyeCodec } from './iq/basic/ByebyeCodec';
import { PingCodec } from './iq/basic/PingCodec';
import { HelloCodec } from './iq/basic/HelloCodec';
import { SET_PROPERTIES_METHOD } from '../typedef/iq/device/control/SetProperties';
import { INVOKE_ACTION_METHOD } from '../typedef/iq/device/control/InvokeAction';
import { GET_CHILDREN_METHOD } from '../typedef/iq/device/control/GetChildren';
import { GET_ACCESS_KEY_METHOD } from '../typedef/iq/device/key/GetAccessKey';
import { SET_ACCESS_KEY_METHOD } from '../typedef/iq/device/key/SetAccessKey';
import { GET_PROPERTIES_METHOD } from '../typedef/iq/device/control/GetProperties';
import { INITIALIZE_METHOD } from '../typedef/iq/device/verify/Initialize';
import { VERIFY_START_METHOD } from '../typedef/iq/device/verify/VerifyStart';
import { VERIFY_FINISH_METHOD } from '../typedef/iq/device/verify/VerifyFinish';
import { SetPropertiesCodec } from './iq/device/control/SetPropertiesCodec';
import { GetPropertiesCodec } from './iq/device/control/GetPropertiesCodec';
import { InvokeActionCodec } from './iq/device/control/InvokeActionCodec';
import { GetChildrenCodec } from './iq/device/control/GetChildrenCodec';
import { GetAccessKeyCodec } from './iq/device/key/GetAccessKeyCodec';
import { SetAccessKeyCodec } from './iq/device/key/SetAccessKeyCodec';
import { InitializeCodec } from './iq/device/verify/InitializeCodec';
import { VerifyStartCodec } from './iq/device/verify/VerifyStartCodec';
import { VerifyFinishCodec } from './iq/device/verify/VerifyFinishCodec';
import { GET_PROPERTY_METHOD } from '../typedef/iq/device/control/GetProperty';
import { INVOKE_ACTIONS_METHOD } from '../typedef/iq/device/control/InvokeActions';
import { SET_PROPERTY_METHOD } from '../typedef/iq/device/control/SetProperty';
import { GetPropertyCodec } from './iq/device/control/GetPropertyCodec';
import { InvokeActionsCodec } from './iq/device/control/InvokeActionsCodec';
import { SetPropertyCodec } from './iq/device/control/SetPropertyCodec';
import { TOPIC_DEVICE } from '../typedef/message/device/DeviceMessage';
import { DeviceMessageCodec } from './message/device/DeviceMessageCodec';
import { Stanza } from '../typedef/Stanza';
import { Message } from '../typedef/message/Message';
import { IQ } from '../typedef/iq/IQ';
import { IQType, IQTypeFromString } from '../typedef/iq/IQType';
import { IQQuery } from '../typedef/iq/IQQuery';
import { IQResult } from '../typedef/iq/IQResult';
import { IQError } from '../typedef/iq/IQError';
import { REMOVE_CHILD_METHOD } from '../typedef/iq/device/control/RemoveChild';
import { RemoveChildCodec } from './iq/device/control/RemoveChildCodec';
import { TOPIC_OWNER } from '../typedef/message/owner/OwnerMessage';
import { OwnerMessageCodec } from './message/device/OwnerMessageCodec';

export class StanzaCodec {

  protected iqCodecs: Map<String, IQCodec>;
  protected messageCodecs: Map<String, MessageCodec<any>>;

  constructor() {
    this.iqCodecs = new Map<String, IQCodec>();
    this.messageCodecs = new Map<String, MessageCodec<any>>();

    this.iqCodecs.set(BYEBYE_METHOD, new ByebyeCodec());
    this.iqCodecs.set(HELLO_METHOD, new HelloCodec());
    this.iqCodecs.set(PING_METHOD, new PingCodec());

    this.iqCodecs.set(GET_CHILDREN_METHOD, new GetChildrenCodec());
    this.iqCodecs.set(REMOVE_CHILD_METHOD, new RemoveChildCodec());
    this.iqCodecs.set(GET_PROPERTIES_METHOD, new GetPropertiesCodec());
    this.iqCodecs.set(GET_PROPERTY_METHOD, new GetPropertyCodec());
    this.iqCodecs.set(INVOKE_ACTION_METHOD, new InvokeActionCodec());
    this.iqCodecs.set(INVOKE_ACTIONS_METHOD, new InvokeActionsCodec());
    this.iqCodecs.set(SET_PROPERTIES_METHOD, new SetPropertiesCodec());
    this.iqCodecs.set(SET_PROPERTY_METHOD, new SetPropertyCodec());

    this.iqCodecs.set(GET_ACCESS_KEY_METHOD, new GetAccessKeyCodec());
    this.iqCodecs.set(SET_ACCESS_KEY_METHOD, new SetAccessKeyCodec());

    this.iqCodecs.set(INITIALIZE_METHOD, new InitializeCodec());
    this.iqCodecs.set(VERIFY_START_METHOD, new VerifyStartCodec());
    this.iqCodecs.set(VERIFY_FINISH_METHOD, new VerifyFinishCodec());

    this.messageCodecs.set(TOPIC_DEVICE, new DeviceMessageCodec());
    this.messageCodecs.set(TOPIC_OWNER, new OwnerMessageCodec());
  }

  private static decodeError(id: string, content: any): IQError {
    if (content != null) {
      const { status } = content;
      const { description } = content;
      return new IQError(id, status, description);
    }

    throw new Error('invalid error, content is null');
  }

  private static encodeError(error: IQError): any {
    const e = {
      id: error.id,
      type: error.type.toString(),
      content: {
        status: error.status,
        description: error.description
      }
    };

    return { iq: e };
  }

  public encode(stanza: Stanza): any {
    if (stanza instanceof IQ) {
      return this.encodeIQ(stanza);
    }

    if (stanza instanceof Message) {
      return this.encodeMessage(stanza);
    }

    throw new Error('invalid stanza');
  }

  private encodeIQ(iq: IQ): any {
    if (iq instanceof IQQuery) {
      return this.encodeQuery(iq);
    }

    if (iq instanceof IQResult) {
      return this.encodeResult(iq);
    }

    if (iq instanceof IQError) {
      return StanzaCodec.encodeError(iq);
    }

    throw new Error('invalid iq');
  }

  private encodeQuery(query: IQQuery): any {
    const iq = {
      id: query.id,
      type: query.type.toString(),
      method: query.method
    };
    this.addQueryContent(iq, query);
    return { iq };
  }

  private addQueryContent(o: any, query: IQQuery) {
    const codec = this.iqCodecs.get(query.method);
    if (codec != null) {
      const content = codec.encodeQueryContent(query);
      if (content != null) {
        o.content = content;
      }
    } else {
      throw new Error('addQueryContent failed, codec not found!');
    }
  }

  private encodeResult(result: IQResult): any {
    const iq = {
      id: result.id,
      type: result.type.toString(),
      method: result.method
    };
    this.addResultContent(iq, result);
    return { iq };
  }

  private addResultContent(o: any, result: IQResult) {
    const codec = this.iqCodecs.get(result.method);
    if (codec != null) {
      const content = codec.encodeResultContent(result);
      if (content != null) {
        o.content = content;
      }
    } else {
      throw new Error('addQueryContent failed, codec not found!');
    }
  }

  public decode(string: string): Stanza {
    const o = JSON.parse(string);
    const { iq } = o;
    if (iq != null) {
      return this.decodeIQ(iq);
    }

    const { message } = o;
    if (message != null) {
      return this.decodeMessage(message);
    }

    throw new Error(`invalid stanza: ${string}`);
  }

  private decodeIQ(o: any): IQ {
    const { id } = o;
    const { type } = o;
    const { method } = o;
    const { content } = o;

    switch (IQTypeFromString(type)) {
      case IQType.QUERY:
        return this.decodeQuery(id, method, content);

      case IQType.RESULT:
        return this.decodeResult(id, method, content);

      case IQType.ERROR:
        return StanzaCodec.decodeError(id, content);

      default:
        throw new Error(`invalid iq: ${o}`);
    }
  }

  private decodeQuery(id: string, method: string, content: any): IQQuery {
    const codec = this.iqCodecs.get(method);
    if (codec != null) {
      return codec.decodeQuery(id, content);
    }

    throw new Error(`invalid query, method not found: ${method}`);
  }

  private decodeResult(id: string, method: string, content: any): IQResult {
    const codec = this.iqCodecs.get(method);
    if (codec != null) {
      return codec.decodeResult(id, content);
    }

    throw new Error(`invalid result, method not found: ${method}`);
  }

  private decodeMessage(o: any): Message<any> {
    const id: string = o.id || '';
    const topic: string = o.topic || '';
    const type: string = o.type || '';
    const payload: any = o.payload || null;

    const codec = this.messageCodecs.get(topic);
    if (codec != null) {
      return codec.decode(id, type, payload);
    }

    throw new Error(`invalid stanza: ${topic}`);
  }

  private encodeMessage(message: Message<any>): any {
    const codec = this.messageCodecs.get(message.topic)
    if (codec == null) {
      throw new Error(`MessageCodec not found: ${message.topic}`);
    }

    const o: any = {
      id: message.id,
      topic: message.topic,
      type: message.type
    };

    const payload = codec.encode(message);
    if (payload != null) {
      o.payload = payload;
    }

    return {
      message: o
    };
  }
}
