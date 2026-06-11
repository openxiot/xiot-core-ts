export enum EventReceiverType {

  UNDEFINED = 'undefined',
  EVENTBUS = 'eventbus',
  HTTP = 'http',
  KAFKA = `kafka`
}

export function EventReceiverTypeToString(type: EventReceiverType): string {
  return type.toString();
}

export function EventReceiverTypeFromString(type: string): EventReceiverType {
  const keys: (keyof typeof EventReceiverType)[] = <(keyof typeof EventReceiverType)[]>Object.keys(EventReceiverType);

  for (const key of keys) {
    const s = EventReceiverTypeToString(EventReceiverType[key]);
    if (s === type) {
      return EventReceiverType[key];
    }
  }

  return EventReceiverType.UNDEFINED;
}
