import {Jwt} from '../Jwt';
import {JwtType} from "../JwtType";

export class JwtRsaImpl extends Jwt {

  publicKey = '';
  privateKey = '';

  constructor(publicKey: string, privateKey: string) {
    super(JwtType.RSA);
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }
}
