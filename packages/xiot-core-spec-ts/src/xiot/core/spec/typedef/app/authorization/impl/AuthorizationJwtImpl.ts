import {Authorization} from '../Authorization';
import {Jwt} from '../../../jwt/Jwt';
import {AuthorizationType} from '../AuthorizationType';

export class AuthorizationJwtImpl extends Authorization {

  constructor(
      public jwt: Jwt
  ) {
    super(AuthorizationType.JWT);
  }
}
