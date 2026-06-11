import { DataValue } from '../DataValue';
import { DataFormat } from '../DataFormat';

export class Vint32 implements DataValue<number> {
  private value = 0;

  static create(value: Object): Vint32 {
    const type = typeof value;
    if (type === 'number') {
      const v = new Vint32();
      v.value = <number>value;
      return v;
    }

    throw new Error(`invalid value: ${value} typeof(value): ${type}`);
  }

  static fromString(value: string): Vint32 {
    const v = new Vint32();
    v.value = Number.parseInt(value);
    return v;
  }

  equals(other: DataValue<number>): boolean {
    return this.value === other.rawValue();
  }

  lessEquals(max: DataValue<number>): boolean {
    if (!(max instanceof Vint32)) {
      return false;
    }

    return this.value <= (<Vint32>max).value;
  }

  validate(min: DataValue<number>, max: DataValue<number>, step?: DataValue<number>): boolean {
    return step ? this.validate3(min, max, step) : this.validate2(min, max);
  }

  private validate2(min: DataValue<number>, max: DataValue<number>): boolean {
    if (!(min instanceof Vint32) || !(max instanceof Vint32)) {
      return false;
    }

    if (this.value < (<Vint32>min).value || this.value > (<Vint32>max).value) {
      return false;
    }

    return true;
  }

  private validate3(min: DataValue<number>, max: DataValue<number>, step: DataValue<number> | null): boolean {
    if (!(min instanceof Vint32) || !(max instanceof Vint32) || !(step instanceof Vint32)) {
      return false;
    }

    const minValue = (<Vint32>min).value;
    const maxValue = (<Vint32>max).value;
    const stepValue = (<Vint32>step).value;

    for (let v = minValue; v <= maxValue; v += stepValue) {
      if (v === this.value) {
        return true;
      }
    }

    return false;
  }

  rawValue(): number {
    return this.value;
  }

  getFormat(): DataFormat {
    return DataFormat.INT32;
  }
}
