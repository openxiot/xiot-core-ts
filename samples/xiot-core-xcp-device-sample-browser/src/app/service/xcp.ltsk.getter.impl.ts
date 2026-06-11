import { Base642Bin, XcpLTSKGetter, KeyPair } from '@loach/xiot-core-xcp-ts'
export class XcpLTSKGetterImpl implements XcpLTSKGetter {
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
