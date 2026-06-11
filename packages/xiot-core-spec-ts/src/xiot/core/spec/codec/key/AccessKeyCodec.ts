import {AccessKey} from '../../typedef/key/AccessKey';

export class AccessKeyCodec {

  static encode(x: AccessKey): any {
    return {
      did: x.did,
      key: x.key
    };
  }

  static decode(o: any): AccessKey {
    const did: string = o['did'];
    const key: string = o['key'];
    return new AccessKey(did, key);
  }
}
