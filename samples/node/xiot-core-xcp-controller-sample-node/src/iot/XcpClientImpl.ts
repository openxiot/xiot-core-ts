import * as WebSocket from 'ws'
import { XcpClientBase } from '@loach/xiot-core-xcp-ts/dist/xiot/core/xcp/impl/XcpClientBase'
import { XcpClientCipher } from '@loach/xiot-core-xcp-ts/dist/xiot/core/xcp/XcpClientCipher'
import { XcpFrameCodecType } from '@loach/xiot-core-xcp-ts/dist/xiot/core/xcp/common/XcpFrameCodecType'

export class XcpClientImpl extends XcpClientBase {
  constructor(
    serialNumber: string,
    productId: number,
    deviceType: string,
    cipher: XcpClientCipher,
    codec: XcpFrameCodecType
  ) {
    super(serialNumber, productId, deviceType, cipher, codec)
  }

  protected createWebSocket(url: string): any {
    return new WebSocket(url)
  }
}
