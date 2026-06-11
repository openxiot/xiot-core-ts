export class XID3 {
  public iid = 0;

  public siid = 0;

  public did = '';

  public valid = true;

  constructor(s?: string, exception = false) {
    if (s) {
      this.parse(s, exception);
    }
  }

  parse(value: string, exception = false): void {
    if (value == null) {
      this.fail('value is null', exception);
    } else {
      const id = value.split('.');
      if (id.length !== 3) {
        this.fail('value invalid', exception);
      }

      this.did = id[0];
      this.siid = Number.parseInt(id[1], 10);
      this.iid = Number.parseInt(id[2], 10);
    }
  }

  private fail(msg: string, exception: boolean): void {
    if (exception) {
      throw new Error(msg);
    }

    this.valid = false;
  }

  toString(): string {
    if (this.valid) {
      return `${this.did}.${this.siid}.${this.iid}`;
    }

    return '';
  }
}
