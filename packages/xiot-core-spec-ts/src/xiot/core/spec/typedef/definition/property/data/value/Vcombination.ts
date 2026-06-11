import { DataValue } from '../DataValue';
import { DataFormat } from '../DataFormat';

export class Vcombination implements DataValue<any[]> {
  private value: any[] = [];

  static create(value: Object): Vcombination {
    if (value instanceof Array) {
      const v = new Vcombination();
      v.value.push(...value);
      return v;
    }
    throw new Error(`invalid value: ${value} is not Array`);
  }

  equals(other: DataValue<any[]>): boolean {
    return this.value === other.rawValue();
  }

  lessEquals(max: DataValue<any[]>): boolean {
    return false;
  }

  validate(min: DataValue<any[]>, max: DataValue<any[]>, step?: DataValue<any[]>): boolean {
    return false;
  }

  rawValue(): any[] {
    return this.value;
  }

  getFormat(): DataFormat {
    return DataFormat.COMBINATION;
  }
}
