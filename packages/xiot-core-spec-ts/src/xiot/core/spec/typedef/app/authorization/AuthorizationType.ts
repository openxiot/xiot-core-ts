export enum AuthorizationType {

  UNDEFINED = 'undefined',
  EVENTBUS = 'eventbus',
  HTTP = 'http',
  JWT = 'jwt'
}

export function AuthorizationTypeToString(type: AuthorizationType): string {
  return type.toString();
}

export function AuthorizationTypeFromString(type: string): AuthorizationType {
  const keys: (keyof typeof AuthorizationType)[] = <(keyof typeof AuthorizationType)[]>Object.keys(AuthorizationType);

  for (const key of keys) {
    const s = AuthorizationTypeToString(AuthorizationType[key]);
    if (s === type) {
      return AuthorizationType[key];
    }
  }

  return AuthorizationType.UNDEFINED;
}
