import { DeviceNotice } from '@gkct/xiot-core-spec-ts'
import { XcpController } from '../XcpController'
import { Message } from '../../../../stanza/typedef/message/Message'
import { IQQuery } from '../../../../stanza/typedef/iq/IQQuery'
import { IQ } from '../../../../stanza/typedef/iq/IQ'
import { StanzaCodec } from '../../../../stanza/codec/StanzaCodec'
import { IQResult } from '../../../../stanza/typedef/iq/IQResult'
import { Stanza } from '../../../../stanza/typedef/Stanza'
import { IQType } from '../../../../stanza/typedef/iq/IQType'
import { IQError } from '../../../../stanza/typedef/iq/IQError'

export class XcpControllerBase implements XcpController {
  private ws: WebSocket | null = null

  private resultHandlers: Map<string, (result: IQResult | null, error: IQError | null) => void>

  private messageHandlers: Map<string, (message: Message<DeviceNotice>) => void>

  private stanzaId = 1

  private connectedHandler: (result: boolean) => void = () => {}

  private disconnectHandler: () => void = () => {}

  constructor(
      private stanzaCodec: StanzaCodec
  ) {
    this.resultHandlers = new Map<string, (result: IQResult | null, error: IQError | null) => void>()
    this.messageHandlers = new Map<string, (message: Message<DeviceNotice>) => void>()
  }

  protected createWebSocket(url: string): any {
    // this.ws = new WebSocket(url);
    throw Error('createWebSocket failed !')
  }

  addDisconnectHandler(handler: () => void): void {
    this.disconnectHandler = handler
  }

  addMessageHandler(topic: string, handler: (message: Message<DeviceNotice>) => void): void {
    console.log('addMessageHandler: ', topic)
    this.messageHandlers.set(topic, handler)
  }

  connect(host: string, port: number, uri: string, isWss?: boolean): Promise<void> {
    const url = `${isWss ? 'wss' : 'ws'}://${host}:${port}${uri}`
    console.log(`connect: ${url}`)

    this.ws = this.createWebSocket(url)
    if (this.ws == null) {
      throw Error('new WebSocket Failed!')
    }

    this.ws.addEventListener('open', () => {
      return this.onConnected()
    })
    this.ws.addEventListener('close', () => {
      return this.onDisconnect()
    })
    this.ws.addEventListener('error', () => {
      return this.onError()
    })
    this.ws.addEventListener('message', e => {
      return this.onReceive(e)
    })

    return new Promise<void>((resolve, reject) => {
      this.connectedHandler = result => {
        if (result) {
          resolve()
          return
        }

        reject()
      }
    })
  }

  disconnect(): void {
    if (this.ws != null) {
      this.ws.close()
    }
  }

  getNextStanzaId(): string {
    return `${Date.now()}#${this.stanzaId++}`
  }

  sendQuery(query: IQQuery, timeout: number | 0): Promise<IQ> {
    this.write(this.stanzaCodec.encode(query))
    return new Promise<IQResult>((resolve, reject) => {
      this.resultHandlers.set(query.id, (result, error) => {
        if (error != null) {
          reject(error)
          return
        }

        if (result == null) {
          return
        }

        resolve(result)
      })
    })
  }

  private onConnected(): void {
    console.log('onConnected')
    this.connectedHandler(true)
  }

  private onDisconnect(): void {
    console.log('onDisconnect')
    this.ws = null
    this.disconnectHandler()
  }

  private onError(): void {
    console.log('onError')
    this.ws = null
  }

  private onReceive(e: any): void {
    console.log(`${Date()} recv text frame: `, e.data)

    const stanza: Stanza | null = this.stanzaCodec.decode(e.data)
    if (stanza == null) {
      return
    }

    this.handleStanza(stanza)
  }

  private handleStanza(stanza: Stanza) {
    if (stanza instanceof IQ) {
      switch (stanza.type) {
        case IQType.RESULT:
          this.handleResult(stanza)
          break

        case IQType.ERROR:
          this.handleError(stanza)
          break

        default:
          console.log('invalid stanza: ', stanza)
          break
      }
    } else if (stanza instanceof Message) {
      this.handleMessage(stanza)
    } else {
      console.log('stanza invalid: ', stanza)
    }
  }

  private handleMessage(message: Message<DeviceNotice>) {
    const handler = this.messageHandlers.get(message.topic)
    if (handler != null) {
      handler(message)
    } else {
      console.log('message invalid: ', message.topic)
    }
  }

  private handleResult(result: IQ) {
    if (!(result instanceof IQResult)) {
      return
    }

    const handler = this.resultHandlers.get(result.id)
    if (handler != null) {
      handler(result, null)
      this.resultHandlers.delete(result.id)
    } else {
      console.log('handle for result not found: ', result.id)
    }
  }

  private handleError(error: IQ) {
    if (!(error instanceof IQError)) {
      return
    }

    const handler = this.resultHandlers.get(error.id)
    if (handler != null) {
      handler(null, error)
      this.resultHandlers.delete(error.id)
    } else {
      console.log('handle for error not found: ', error.id)
    }
  }

  private write(o: Object) {
    const s = JSON.stringify(o)
    console.log(`${Date()} write: `, s)

    if (this.ws != null) {
      this.ws.send(s)
    }
  }
}
