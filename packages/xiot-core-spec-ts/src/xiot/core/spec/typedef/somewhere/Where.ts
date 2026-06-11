export enum Where {
    UNKNOWN = "unknown",
    LOCAL = "local",
    CLUSTER = "cluster",
    CLOUD = "cloud",
    LOCAL_AND_CLOUD = "local-and-cloud"
}

export function WhereToString(x: Where): string {
    return x.toString();
}

export function WhereFromString(type: string): Where {
    const keys: (keyof typeof Where)[] = <(keyof typeof Where)[]>Object.keys(Where);

    for (const key of keys) {
        const s = WhereToString(Where[key]);
        if (s === type) {
            return Where[key];
        }
    }

    return Where.UNKNOWN;
}