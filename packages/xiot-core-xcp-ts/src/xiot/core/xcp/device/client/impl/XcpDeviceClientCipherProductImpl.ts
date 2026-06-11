import { Ed25519 } from 'mipher-ts';
import { XcpDeviceClientCipher } from '../XcpDeviceClientCipher';
import { XcpAuthenticationType } from '../common/XcpAuthenticationType';
import { XcpDeviceLTSKGetter } from '../XcpDeviceLTSKGetter';

export class XcpDeviceClientCipherProductImpl implements XcpDeviceClientCipher {
  constructor(private deviceType: string, private getter: XcpDeviceLTSKGetter, private serverLTPK: Uint8Array) {}

  getAuthenticationType(): XcpAuthenticationType {
    return XcpAuthenticationType.DEVICE_TYPE;
  }

  sign(info: Uint8Array): Uint8Array {
    const keypair = this.getter.getTypeKeyPair(this.deviceType);
    const e = new Ed25519();
    return e.sign(info, keypair.seed, keypair.pk);
  }

  verify(info: Uint8Array, signature: Uint8Array): boolean {
    const e = new Ed25519();
    return e.verify(info, this.serverLTPK, signature);
  }
}
