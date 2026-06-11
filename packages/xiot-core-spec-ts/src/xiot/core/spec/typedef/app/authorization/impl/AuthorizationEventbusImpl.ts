import {Authorization} from '../Authorization';
import {AuthorizationType} from '../AuthorizationType';

export class AuthorizationEventbusImpl extends Authorization {

  constructor(
      public address: string
  ) {
    super(AuthorizationType.EVENTBUS);
  }
}
