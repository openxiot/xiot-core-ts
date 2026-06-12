export class SemanticVersion {
  major: number

  minor: number

  patch: number

  constructor(major: number, minor: number, patch: number) {
    this.major = major
    this.minor = minor
    this.patch = patch
  }

  static fromString(version: string) {
    const s: string[] = version.split('.')
    const x = Number.parseInt(s[0])
    const y = Number.parseInt(s[1])
    const z = Number.parseInt(s[2])
    return new SemanticVersion(x, y, z)
  }

  toString() {
    return `${this.major}.${this.minor}.${this.patch}`
  }
}
