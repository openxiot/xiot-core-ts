import {AuthorizationHttpImpl} from '../../../../typedef/app/authorization/impl/AuthorizationHttpImpl';

export class AuthorizationHttpImplCodec {

  static encode(x: AuthorizationHttpImpl): any {
    return {
      url: x.url
    };
  }

  static decode(o: any): AuthorizationHttpImpl {
    return new AuthorizationHttpImpl(o['url']);
  }
}
