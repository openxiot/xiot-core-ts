import { DataValue } from '../DataValue';
import { DataFormat } from '../DataFormat';

export class Vstring implements DataValue<string> {
  private value = '';

  static create(value: Object): Vstring {
    const type = typeof value;
    const v = new Vstring();
    if (type === 'string') {
      v.value = String(value);
    } else {
      console.log(`invalid value: ${value} typeof(value): ${type}`);
    }
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
    return DataFormat.STRING;
  }
}
