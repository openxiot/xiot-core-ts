import {Authorization} from '../../../typedef/app/authorization/Authorization';
import {AuthorizationType, AuthorizationTypeFromString} from '../../../typedef/app/authorization/AuthorizationType';
import {AuthorizationEventbusImplCodec} from './impl/AuthorizationEventbusImplCodec';
import {AuthorizationHttpImplCodec} from './impl/AuthorizationHttpImplCodec';
import {AuthorizationJwtImplCodec} from './impl/AuthorizationJwtImplCodec';
import {AuthorizationEventbusImpl} from '../../../typedef/app/authorization/impl/AuthorizationEventbusImpl';
import {AuthorizationHttpImpl} from '../../../typedef/app/authorization/impl/AuthorizationHttpImpl';
import {AuthorizationJwtImpl} from '../../../typedef/app/authorization/impl/AuthorizationJwtImpl';

export class AuthorizationCodec {

  static decode(o: any): Authorization {
    const type = AuthorizationTypeFromString(o.type);

    switch (type) {
      case AuthorizationType.EVENTBUS:
        return AuthorizationEventbusImplCodec.decode(o['eventbus']);

      case AuthorizationType.HTTP:
        return AuthorizationHttpImplCodec.decode(o['http']);

      case AuthorizationType.JWT:
        return AuthorizationJwtImplCodec.decode(o['jwt']);

      default:
        throw new Error('Authorization Invalid: ' + o);
    }
  }

  static encode(x: Authorization): any {
    const o: any = {
      type: x.type.toString()
    };

    if (x instanceof AuthorizationEventbusImpl) {
      o.eventbus = AuthorizationEventbusImplCodec.encode(x);
    } else if (x instanceof AuthorizationHttpImpl) {
      o.http = AuthorizationHttpImplCodec.encode(x);
    } else if (x instanceof AuthorizationJwtImpl) {
      o.jwt = AuthorizationJwtImplCodec.encode(x);
    }

    return o;
  }
}
