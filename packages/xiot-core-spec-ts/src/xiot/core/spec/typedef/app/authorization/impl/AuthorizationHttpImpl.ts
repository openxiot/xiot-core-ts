import {Authorization} from '../Authorization';
import {AuthorizationType} from '../AuthorizationType';

export class AuthorizationHttpImpl extends Authorization {

  constructor(
      public url: string
  ) {
    super(AuthorizationType.HTTP);
  }
}
