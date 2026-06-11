import { DataValue } from '../DataValue';
import { DataFormat } from '../DataFormat';

export class Vtlv8 implements DataValue<string> {
  private value = '';

  static create(value: Object): Vtlv8 {
    const type = typeof value;
    if (type === 'string') {
      const v = new Vtlv8();
      v.value = <string>value;
      return v;
    }

    throw new Error(`invalid value: ${value} typeof(value): ${type}`);
  }

  static fromString(value: string): Vtlv8 {
    const v = new Vtlv8();
    v.value = value;
    return v;
  }

  equals(other: DataValue<string>): boolean {
    return this.value === other.rawValue();
  }

  lessEquals(maxValue: DataValue<string>): boolean {
    return false;
  }

  validate(min: DataValue<string>, max: DataValue<string>, step?: DataValue<string>): boolean {
    return false;
  }

  rawValue(): string {
    return this.value;
  }

  getFormat(): DataFormat {
    return DataFormat.TLV8;
  }
}
