import {AuthorizationJwtImpl} from '../../../../typedef/app/authorization/impl/AuthorizationJwtImpl';
import {JwtCodec} from '../../../jwt/JwtCodec';

export class AuthorizationJwtImplCodec {

  static encode(x: AuthorizationJwtImpl): any {
    return JwtCodec.encode(x.jwt);
  }

  static decode(o: any): AuthorizationJwtImpl {
    return new AuthorizationJwtImpl(JwtCodec.decode(o));
  }
}
