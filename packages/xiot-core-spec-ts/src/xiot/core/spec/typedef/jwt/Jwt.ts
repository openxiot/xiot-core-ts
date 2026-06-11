import {JwtType} from './JwtType';

export abstract class Jwt {

  type: JwtType = JwtType.UNDEFINED;

  algorithm: string = DEFAULT_SECRETS_SIGNATURE_ALGORITHM;

  expiresInSeconds: Number = 0;

  protected constructor(type: JwtType) {
    this.type = type;
  }
}

export const DEFAULT_SECRETS_SIGNATURE_ALGORITHM = 'HS256';
export const DEFAULT_RSA_SIGNATURE_ALGORITHM = 'RS256';
export const DEFAULT_ES_SIGNATURE_ALGORITHM = 'ES256';
