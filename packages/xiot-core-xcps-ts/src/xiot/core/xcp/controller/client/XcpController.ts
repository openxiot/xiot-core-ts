import { DeviceNotice } from '@openxiot/xiot-core-spec-ts'
import { IQ, IQQuery, Message } from '../../../../../index'

export interface XcpController {
  connect(host: string, port: number, uri: string, isWss?: boolean): Promise<void>

  disconnect(): void

  addDisconnectHandler(handler: () => void): void

  getNextStanzaId(): string

  addMessageHandler(topic: string, handler: (message: Message<DeviceNotice>) => void): void

  sendQuery(query: IQQuery, timeout: number | 0): Promise<IQ>
}
