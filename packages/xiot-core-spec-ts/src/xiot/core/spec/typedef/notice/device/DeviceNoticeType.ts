export enum DeviceNoticeType {
  UNDEFINED = 'undefined',
  PROPERTIES_CHANGED = 'properties-changed',
  PROPERTY_CHANGED = 'property-changed',
  EVENT_OCCURRED = 'event-occurred',
  CHILDREN_REMOVED = 'children-removed',
  CHILDREN_ADDED = 'children-added',
  ACCESSKEY_CHANGED = 'accesskey-changed',
  ROOT_ACTIVE = 'root-active',
  ROOT_INACTIVE = 'root-inactive',
  SUMMARY_CHANGED = 'summary-changed'
}

export function DeviceNoticeTypeToString(type: DeviceNoticeType): string {
  return type.toString();
}

export function DeviceNoticeTypeFromString(type: string): DeviceNoticeType {
  const keys: (keyof typeof DeviceNoticeType)[] = <(keyof typeof DeviceNoticeType)[]>Object.keys(DeviceNoticeType);

  for (const key of keys) {
    const s = DeviceNoticeTypeToString(DeviceNoticeType[key]);
    if (s === type) {
      return DeviceNoticeType[key];
    }
  }

  return DeviceNoticeType.UNDEFINED;
}
