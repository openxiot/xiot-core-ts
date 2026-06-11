import {Jwt} from '../Jwt';
import {JwtType} from "../JwtType";

export class JwtEsImpl extends Jwt {

  publicKey = '';
  privateKey = '';

  constructor(publicKey: string, privateKey: string) {
    super(JwtType.ES);
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }
}
