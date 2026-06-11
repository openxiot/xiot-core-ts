
export interface Logical {
  check(values: Array<boolean>): boolean;
}

export class LogicalAND implements Logical {
  check(values: Array<boolean>): boolean {
    return values.filter(value => value).length === values.length;
  }

}

export class LogicalOR implements Logical {
  check(values: Array<boolean>): boolean {
    return values.filter(value => value).length > 0;
  }

}
