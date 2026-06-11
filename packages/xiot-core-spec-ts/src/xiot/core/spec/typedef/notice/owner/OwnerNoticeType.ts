export enum OwnerNoticeType {
    UNDEFINED = 'undefined',
    DEVICE_ADDED = 'device-added',
    DEVICE_REMOVED = 'device-removed',
    DEVICE_SUMMARY_CHANGED = 'device-summary-changed',
    DEVICE_SOMEWHERE_CHANGED = 'device-somewhere-changed',
    DEVICE_PROPERTIES_CHANGED = 'device-properties-changed',
    DEVICE_EVENT_OCCURRED = 'device-event-occurred',
    OWNERSHIP_TAKEN = 'ownership-taken',
    OWNERSHIP_DISCLAIMED = 'ownership-disclaimed',

    RULE_ADDED = 'rule-added',

    RULE_REMOVED = 'rule-removed',

    RULE_CHANGED = 'rule-changed',

    RULE_TRIGGERED = 'rule-triggered',

    RULE_EXECUTED = 'rule-executed',

    /**
     * home added
     */
    HOME_ADDED = "home-added",

    /**
     * home removed
     */
    HOME_REMOVED = "home-removed",

    /**
     * home changed
     */
    HOME_CHANGED = "home-changed",

    /**
     * space added
     */
    SPACE_ADDED = "space-added",

    /**
     * space removed
     */
    SPACE_REMOVED = "space-removed",

    /**
     * space changed
     */
    SPACE_CHANGED = "space-changed",
}

export function OwnerNoticeTypeToString(type: OwnerNoticeType): string {
    return type.toString();
}

export function OwnerNoticeTypeFromString(type: string): OwnerNoticeType {
    const keys: (keyof typeof OwnerNoticeType)[] = <(keyof typeof OwnerNoticeType)[]>Object.keys(OwnerNoticeType);

    for (const key of keys) {
        const s = OwnerNoticeTypeToString(OwnerNoticeType[key]);
        if (s === type) {
            return OwnerNoticeType[key];
        }
    }

    return OwnerNoticeType.UNDEFINED;
}
