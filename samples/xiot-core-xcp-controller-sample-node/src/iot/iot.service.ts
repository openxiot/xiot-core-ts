import { IotLtskGetterImpl } from './iot.ltsk.getter.impl'
import {
  XcpFrameCodecType,
  XcpClientCipherProductImpl,
  XcpClient,
  GET_PROPERTIES_METHOD,
  SET_PROPERTIES_METHOD,
  INVOKE_ACTIONS_METHOD,
  IQQuery,
  QueryGetAccessKey,
  ResultGetAccessKey,
  QuerySetAccessKey,
  ResultSetAccessKey,
  QuerySetProperties,
  QueryGetProperties,
  QueryInvokeActions,
  QueryPing,
  Base642Bin
} from '@loach/xiot-core-xcp-ts'
import { Status } from '@loach/xiot-core-spec-ts'
import { IotStatus } from './iot.status'
// import {getProperty} from '../device/on.property.get';
// import {setProperty} from '../device/on.property.set';
import { getProperty, setProperty } from '../device/properties'
import { invokeActions } from '../device/on.action.invoke'
import { XcpClientImpl } from './XcpClientImpl'

export class IotService {
  status: IotStatus = IotStatus.UNINITIALIZED

  private client: XcpClient
  private timer: any = null

  uninitialized(): boolean {
    return this.status === IotStatus.UNINITIALIZED
  }

  constructor(
    serialNumber: string,
    productId: number,
    deviceType: string,
    deviceSeed: string,
    deviceLTPK: string,
    deviceLTSK: string,
    serviceKey: string
  ) {
    console.log('IotService.initialize')

    this.status = IotStatus.INITIALIZING
    const serverLTPK = Base642Bin(serviceKey)
    const getter = new IotLtskGetterImpl(deviceSeed, deviceLTPK, deviceLTSK)
    const cipher = new XcpClientCipherProductImpl(deviceType, getter, serverLTPK)
    const codec = XcpFrameCodecType.NOT_CRYPT
    this.client = new XcpClientImpl(serialNumber, productId, deviceType, cipher, codec)
    this.client.addQueryHandler(GET_PROPERTIES_METHOD, query => this.getProperties(query))
    this.client.addQueryHandler(SET_PROPERTIES_METHOD, query => this.setProperties(query))
    this.client.addQueryHandler(INVOKE_ACTIONS_METHOD, query => this.invokeActions(query))
    this.status = IotStatus.INITIALIZED
  }

  did(): string {
    return this.client.getDeviceId()
  }

  connect(host: string, port: number, uri: string): Promise<void> {
    this.checkClient()
    this.status = IotStatus.CONNECTING
    return this.client.connect(host, port, uri).then(x => {
      console.log('connect to xcp server ok!')
      this.status = IotStatus.CONNECTED
      if (this.timer == null) {
        this.timer = setInterval(() => this.doKeepalive(), 1000 * 30)
      }

      return x
    })
  }

  disconnect(): void {
    console.log('disconnect')
    this.status = IotStatus.DISCONNECTING
    this.checkClient()
    if (this.timer != null) {
      clearInterval(this.timer)
      this.timer = null
    }
    this.status = IotStatus.DISCONNECTED
    return this.client.disconnect()
  }

  getAccessKey(): Promise<string> {
    return this.client.sendQuery(new QueryGetAccessKey(this.client.getNextStanzaId())).then((result: any) => {
      if (result instanceof ResultGetAccessKey) {
        return result.key
      } else {
        console.error('invalid result: ', typeof result)
        return ''
      }
    })
  }

  resetAccessKey(): Promise<string> {
    const key = 'this a demo key'
    return this.client.sendQuery(new QuerySetAccessKey(this.client.getNextStanzaId(), key)).then((result: any) => {
      if (result instanceof ResultSetAccessKey) {
        return key
      } else {
        console.error('invalid result: ', typeof result)
        return key
      }
    })
  }

  private getProperties(query: IQQuery): void {
    if (query instanceof QueryGetProperties) {
      query.properties.forEach((x: any) => getProperty(x))
      this.client.sendResult(query.result(query.properties))
    } else {
      this.client.sendError(query.error(Status.UNDEFINED, 'invalid query'))
    }
  }

  private setProperties(query: IQQuery): void {
    if (query instanceof QuerySetProperties) {
      query.properties.forEach(x => setProperty(x))
      this.client.sendResult(query.result(query.properties))
    } else {
      this.client.sendError(query.error(Status.UNDEFINED, 'invalid query'))
    }
  }

  private invokeActions(query: IQQuery): void {
    if (query instanceof QueryInvokeActions) {
      invokeActions(query.actions)
      this.client.sendResult(query)
    } else {
      this.client.sendError(query.error(Status.UNDEFINED, 'invalid query'))
    }
  }

  private doKeepalive(): void {
    this.checkClient()
    this.client
      .sendQuery(new QueryPing(this.client.getNextStanzaId()))
      .then(x => {
        console.log('recv pong: ', x.id)
      })
      .catch(e => {
        console.log('ping failed: ', e)
      })
  }

  private checkClient() {
    if (this.client == null) {
      throw new Error('client not create!')
    }
  }
}
