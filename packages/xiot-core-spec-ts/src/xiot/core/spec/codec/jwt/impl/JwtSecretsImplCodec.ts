import {JwtSecretsImpl} from '../../../typedef/jwt/impl/JwtSecretsImpl';
import {DEFAULT_SECRETS_SIGNATURE_ALGORITHM} from '../../../typedef/jwt/Jwt';

export class JwtSecretsImplCodec {

  static encode(x: JwtSecretsImpl): any {
    const o: any = {
      'key': x.key,
    };

    if (x.expiresInSeconds > 0) {
      o.expiresInSeconds = x.expiresInSeconds;
    }

    if (x.algorithm !== DEFAULT_SECRETS_SIGNATURE_ALGORITHM) {
      o.algorithm = x.algorithm;
    }

    return o;
  }

  static decode(o: any): JwtSecretsImpl {
    const key: string = o['key'];
    return new JwtSecretsImpl(key);
  }
}
