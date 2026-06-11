export abstract class Notice {
  timestamp: number;

  protected constructor(timestamp: number) {
    this.timestamp = timestamp;
  }

  abstract mainType(): string;

  abstract subType(): string;
}
