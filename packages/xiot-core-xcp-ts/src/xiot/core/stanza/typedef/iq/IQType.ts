export enum IQType {
  UNDEFINED = 'undefined',
  QUERY = 'query',
  RESULT = 'result',
  ERROR = 'error'
}

export function IQTypeFromString(type: string): IQType {
  const keys: (keyof typeof IQType)[] = <(keyof typeof IQType)[]>Object.keys(IQType);

  for (const key of keys) {
    const s = IQType[key].toString();
    if (s === type) {
      return IQType[key];
    }
  }

  return IQType.UNDEFINED;
}
