export enum UrnType {
  UNDEFINED = 'undefined',
  PROPERTY = 'property',
  ACTION = 'action',
  EVENT = 'event',
  SERVICE = 'service',
  DEVICE = 'device',
  GROUP = 'group',
  FORMAT = 'format',
  UNIT = 'unit'
}

export function UrnTypeToString(type: UrnType): string {
  return type.toString();
}

export function UrnTypeFromString(type: string): UrnType {
  const keys: (keyof typeof UrnType)[] = <(keyof typeof UrnType)[]>Object.keys(UrnType);

  for (const key of keys) {
    const s = UrnTypeToString(UrnType[key]);
    if (s === type) {
      return UrnType[key];
    }
  }

  return UrnType.UNDEFINED;
}
