import { DataValue } from '../DataValue';
import { DataFormat } from '../DataFormat';

export class Vbool implements DataValue<boolean> {
  private value = false;

  static create(value: Object): Vbool {
    const type = typeof value;
    switch (type) {
      case 'boolean':
        const v = new Vbool();
        v.value = <boolean>value;
        return v;

      case 'number':
        const vv = new Vbool();
        vv.value = <number>value === 1;
        return vv;

      default:
        throw new Error(`invalid value: ${value} typeof(value): ${type}`);
    }
  }

  static fromString(value: string): Vbool {
    if (value === 'true') {
      const v = new Vbool();
      v.value = true;
      return v;
    }
    if (value === 'false') {
      const v = new Vbool();
      v.value = false;
      return v;
    }

    throw new Error(`Vbool invalid value: ${value}`);
  }

  equals(other: DataValue<boolean>): boolean {
    return this.value === other.rawValue();
  }

  lessEquals(maxValue: DataValue<boolean>): boolean {
    return false;
  }

  validate(min: DataValue<boolean>, max: DataValue<boolean>, step?: DataValue<boolean>): boolean {
    return false;
  }

  rawValue(): boolean {
    return this.value;
  }

  getFormat(): DataFormat {
    return DataFormat.BOOL;
  }
}
