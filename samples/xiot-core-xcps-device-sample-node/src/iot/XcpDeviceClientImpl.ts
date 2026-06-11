import * as WebSocket from 'ws'
import { XcpDeviceClientBase } from '@gkct/xiot-core-xcps-ts'

export class XcpDeviceClientImpl extends XcpDeviceClientBase {
  constructor(
    serialNumber: string,
    productId: string,
    deviceType: string
  ) {
    super(serialNumber, productId, deviceType)
  }

  protected createWebSocket(url: string, options: any): any {
    return new WebSocket(url, options)
  }
}
