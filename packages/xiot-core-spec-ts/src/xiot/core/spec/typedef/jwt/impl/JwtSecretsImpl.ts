import {Jwt} from '../Jwt';
import {JwtType} from "../JwtType";

export class JwtSecretsImpl extends Jwt {

  key = '';

  constructor(key: string) {
    super(JwtType.SECRETS);
    this.key = key;
  }
}
