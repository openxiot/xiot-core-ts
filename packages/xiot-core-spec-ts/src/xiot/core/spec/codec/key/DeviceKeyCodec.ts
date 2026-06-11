import {DeviceKey} from '../../typedef/key/DeviceKey';

export class DeviceKeyCodec {

  static encode(x: DeviceKey): any {
    return {
      did: x.did,
      ltpk: x.ltpk,
      ltsk: x.ltsk,
      seed: x.seed,
      productId: x.productId
    };
  }

  static decode(o: any): DeviceKey {
    const did: string = o['did'];
    const ltpk: string = o['ltpk'];
    const ltsk: string = o['ltsk'];
    const seed: string = o['seed'];
    const productId: string = o['productId'];
    return new DeviceKey(did, ltpk, ltsk, seed, productId);
  }
}
