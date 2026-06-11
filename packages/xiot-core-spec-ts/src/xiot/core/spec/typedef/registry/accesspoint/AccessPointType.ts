
export enum AccessPointType {

  UNDEFINED = 'undefined',
  EVENTBUS = 'eventbus',
  HTTP = 'http'
}


export function AccessPointTypeToString(type: AccessPointType): string {
  return type.toString();
}

export function AccessPointTypeFromString(type: string): AccessPointType {
  const keys: (keyof typeof AccessPointType)[] = <(keyof typeof AccessPointType)[]>Object.keys(AccessPointType);

  for (const key of keys) {
    const s = AccessPointTypeToString(AccessPointType[key]);
    if (s === type) {
      return AccessPointType[key];
    }
  }

  return AccessPointType.UNDEFINED;
}
