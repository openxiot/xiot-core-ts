import * as WebSocket from 'ws'
import { XcpDeviceClientBase, XcpDeviceClientCipher, XcpFrameCodecType } from '@gkct/xiot-core-xcp-ts'

export class XcpDeviceClientImpl extends XcpDeviceClientBase {
  constructor(
    serialNumber: string,
    productId: string,
    deviceType: string,
    cipher: XcpDeviceClientCipher,
    codec: XcpFrameCodecType
  ) {
    super(serialNumber, productId, deviceType, cipher, codec)
  }

  protected createWebSocket(url: string): any {
    return new WebSocket(url)
  }
}
