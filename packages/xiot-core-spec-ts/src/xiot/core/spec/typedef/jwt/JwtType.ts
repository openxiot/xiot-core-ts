
export enum JwtType {
  UNDEFINED = 'undefined',
  SECRETS = 'secrets',
  RSA = 'rsa',
  ES = `es`,
}

export function JwtTypeToString(type: JwtType): string {
  return type.toString();
}

export function JwtTypeFromString(type: string): JwtType {
  const keys: (keyof typeof JwtType)[] = <(keyof typeof JwtType)[]>Object.keys(JwtType);

  for (const key of keys) {
    const s = JwtTypeToString(JwtType[key]);
    if (s === type) {
      return JwtType[key];
    }
  }

  return JwtType.UNDEFINED;
}
