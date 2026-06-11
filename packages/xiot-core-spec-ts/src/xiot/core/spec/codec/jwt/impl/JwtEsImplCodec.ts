import {JwtEsImpl} from '../../../typedef/jwt/impl/JwtEsImpl';
import {DEFAULT_ES_SIGNATURE_ALGORITHM} from '../../../typedef/jwt/Jwt';

export class JwtEsImplCodec {

  static encode(x: JwtEsImpl): any {
    const o: any = {
      'public-key': x.publicKey,
      'private-key': x.privateKey,
    };

    if (x.expiresInSeconds > 0) {
      o.expiresInSeconds = x.expiresInSeconds;
    }

    if (x.algorithm !== DEFAULT_ES_SIGNATURE_ALGORITHM) {
      o.algorithm = x.algorithm;
    }

    return o;
  }

  static decode(o: any): JwtEsImpl {
    const publicKey: string = o['public-key'];
    const privateKey: string = o['private-key'];
    return new JwtEsImpl(publicKey, privateKey);
  }
}
