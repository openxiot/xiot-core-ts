import {AuthorizationEventbusImpl} from '../../../../typedef/app/authorization/impl/AuthorizationEventbusImpl';

export class AuthorizationEventbusImplCodec {

  static encode(x: AuthorizationEventbusImpl): any {
    return {
      address: x.address,
    };
  }

  static decode(o: any): AuthorizationEventbusImpl {
    return new AuthorizationEventbusImpl(o['address']);
  }
}
