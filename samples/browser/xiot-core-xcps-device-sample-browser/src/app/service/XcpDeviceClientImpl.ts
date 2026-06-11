import { XcpDeviceClientBase } from '@gkct/xiot-core-xcps-ts'

export default class XcpDeviceClientImpl extends XcpDeviceClientBase {
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
