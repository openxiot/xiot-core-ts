import {
  XcpDeviceClient,
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
} from '@gkct/xiot-core-xcps-ts'
import { Status } from '@gkct/xiot-core-spec-ts'
import { IotStatus } from './iot.status'
import { getProperty } from '../device/on.property.get'
import { setProperty } from '../device/on.property.set'
import { invokeActions } from '../device/on.action.invoke'
import { XcpDeviceClientImpl } from './XcpDeviceClientImpl'

export class IotService {
  status: IotStatus = IotStatus.UNINITIALIZED

  private client: XcpDeviceClient
  private timer: any = null

  uninitialized(): boolean {
    return this.status === IotStatus.UNINITIALIZED
  }

  constructor(
    serialNumber: string,
    productId: string,
    deviceType: string,
  ) {
    console.log('IotService.initialize')

    this.status = IotStatus.INITIALIZING
    this.client = new XcpDeviceClientImpl(serialNumber, productId, deviceType)
    this.client.addQueryHandler(GET_PROPERTIES_METHOD, query => this.getProperties(query))
    this.client.addQueryHandler(SET_PROPERTIES_METHOD, query => this.setProperties(query))
    this.client.addQueryHandler(INVOKE_ACTIONS_METHOD, query => this.invokeActions(query))
    this.status = IotStatus.INITIALIZED
  }

  did(): string {
    return this.client.getDeviceId()
  }

  connect(url: string, key: string, cert: string): Promise<void> {
    this.checkClient()
    this.status = IotStatus.CONNECTING
    const options: any = {
      agent: false,
      key: key,
      cert: cert,
      rejectUnauthorized: false,
    }

    return this.client.connect(url, options).then(x => {
      console.log('connect to xcp server ok!')
      this.status = IotStatus.CONNECTED
      if (this.timer == null) {
        this.timer = setInterval(() => this.doKeepalive(), 1000 * 15)
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
