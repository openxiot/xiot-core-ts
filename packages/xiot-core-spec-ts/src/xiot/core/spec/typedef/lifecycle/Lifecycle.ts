export enum LifeCycle {
  UNDEFINED = 'undefined',
  DEVELOPMENT = 'development',
  PREVIEW = 'preview',
  RELEASED = 'released'
}

export function LifeCycleToString(lifecycle: LifeCycle): string {
  return lifecycle.toString();
}

export function LifeCycleFromString(lifecycle: string): LifeCycle {
  const keys: (keyof typeof LifeCycle)[] = <(keyof typeof LifeCycle)[]>Object.keys(LifeCycle);

  for (const key of keys) {
    const s = LifeCycleToString(LifeCycle[key]);
    if (s === lifecycle) {
      return LifeCycle[key];
    }
  }

  return LifeCycle.UNDEFINED;
}
