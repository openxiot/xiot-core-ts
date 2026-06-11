export enum StanzaType {
  UNDEFINED = 'undefined',
  IQ = 'iq',
  MESSAGE = 'message'
}

export function StanzaTypeFromString(type: string): StanzaType {
  const keys: (keyof typeof StanzaType)[] = <(keyof typeof StanzaType)[]>Object.keys(StanzaType);

  for (const key of keys) {
    const s = StanzaType[key].toString()
    if (s === type) {
      return StanzaType[key];
    }
  }

  return StanzaType.UNDEFINED;
}
