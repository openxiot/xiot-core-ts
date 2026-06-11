import {Jwt} from '../../typedef/jwt/Jwt';
import {JwtType, JwtTypeFromString} from '../../typedef/jwt/JwtType';
import {JwtSecretsImplCodec} from './impl/JwtSecretsImplCodec';
import {JwtRsaImplCodec} from './impl/JwtRsaImplCodec';
import {JwtEsImplCodec} from './impl/JwtEsImplCodec';
import {JwtSecretsImpl} from '../../typedef/jwt/impl/JwtSecretsImpl';
import {JwtRsaImpl} from '../../typedef/jwt/impl/JwtRsaImpl';
import {JwtEsImpl} from '../../typedef/jwt/impl/JwtEsImpl';


export class JwtCodec {

  static decode(o: any): Jwt {
    const type = JwtTypeFromString(o.type);

    switch (type) {
      case JwtType.SECRETS:
        return JwtSecretsImplCodec.decode(o['secrets']);

      case JwtType.RSA:
        return JwtRsaImplCodec.decode(o['rsa']);

      case JwtType.ES:
        return JwtEsImplCodec.decode(o['es']);

      default:
        throw new Error('Jwt Invalid: ' + o);
    }
  }

  static encode(jwt: Jwt): any {
    const o: any = {
      type: jwt.type.toString()
    };

    if (jwt instanceof JwtSecretsImpl) {
      o.secrets = JwtSecretsImplCodec.encode(jwt);
    } else if (jwt instanceof JwtRsaImpl) {
      o.rsa = JwtRsaImplCodec.encode(jwt);
    } else if (jwt instanceof JwtEsImpl) {
      o.es = JwtEsImplCodec.encode(jwt);
    }

    return o;
  }
}
