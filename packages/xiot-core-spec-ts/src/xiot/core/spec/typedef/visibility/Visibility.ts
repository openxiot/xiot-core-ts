export enum Visibility {
    UNDEFINED = 'undefined',
    PUBLIC = 'public',
    PRIVATE = 'private',
}

export function VisibilityToString(type: Visibility): string {
    return type.toString();
}

export function VisibilityFromString(type: string): Visibility {
    const keys: (keyof typeof Visibility)[] = <(keyof typeof Visibility)[]>Object.keys(Visibility);

    for (const key of keys) {
        const s = VisibilityToString(Visibility[key]);
        if (s === type) {
            return Visibility[key];
        }
    }

    return Visibility.UNDEFINED;
}
