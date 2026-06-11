import {JwtRsaImpl} from '../../../typedef/jwt/impl/JwtRsaImpl';
import {DEFAULT_RSA_SIGNATURE_ALGORITHM} from '../../../typedef/jwt/Jwt';

export class JwtRsaImplCodec {

  static encode(x: JwtRsaImpl): any {
    const o: any = {
      'public-key': x.publicKey,
      'private-key': x.privateKey,
    };

    if (x.expiresInSeconds > 0) {
      o.expiresInSeconds = x.expiresInSeconds;
    }

    if (x.algorithm !== DEFAULT_RSA_SIGNATURE_ALGORITHM) {
      o.algorithm = x.algorithm;
    }

    return o;
  }

  static decode(o: any): JwtRsaImpl {
    const publicKey: string = o['public-key'];
    const privateKey: string = o['private-key'];
    return new JwtRsaImpl(publicKey, privateKey);
  }
}
