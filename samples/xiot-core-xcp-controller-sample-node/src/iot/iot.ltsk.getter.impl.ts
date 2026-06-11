import { XcpLTSKGetter, KeyPair } from '@loach/xiot-core-xcp-ts'
import { Base642Bin } from '@loach/xiot-core-xcp-ts/dist/xiot/core/xcp/utils/Uint8ArrayUtils'

export class IotLtskGetterImpl implements XcpLTSKGetter {
  private k: KeyPair

  constructor(private seed: string, private pk: string, private sk: string) {
    this.k = new KeyPair(Base642Bin(seed), Base642Bin(pk), Base642Bin(sk))
  }

  getDeviceKeypair(deviceId: string): KeyPair {
    return this.k
  }

  getProductKeyPair(productId: number, productVersion: number): KeyPair {
    return this.k
  }

  getTypeKeyPair(deviceType: string): KeyPair {
    return this.k
  }
}
