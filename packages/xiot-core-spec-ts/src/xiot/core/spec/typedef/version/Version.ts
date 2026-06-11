export class Version {
  major: number;

  minor: number;

  patch: number;

  constructor(major: number, minor: number, patch: number) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  static fromString(version: string) {
    const s: string[] = version.split('.');
    const x = Number.parseInt(s[0]);
    const y = Number.parseInt(s[1]);
    const z = Number.parseInt(s[2]);
    return new Version(x, y, z);
  }

  toString() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }

  greaterThan(other: Version): boolean {
    if (this.major > other.major) {
      return true;
    } else if (this.major === other.major) {
      if (this.minor > other.minor) {
        return true;
      } else if (this.minor === other.minor) {
        return this.patch > other.patch;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
