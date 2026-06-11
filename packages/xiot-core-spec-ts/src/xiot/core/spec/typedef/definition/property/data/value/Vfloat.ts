import { DataValue } from '../DataValue';
import { DataFormat } from '../DataFormat';

export class Vfloat implements DataValue<number> {
  private value = 0;

  static create(value: Object): Vfloat {
    const type = typeof value;
    if (type === 'number') {
      const v = new Vfloat();
      v.value = <number>value;
      return v;
    }

    throw new Error(`invalid value: ${value} typeof(value): ${type}`);
  }

  static fromString(value: string): Vfloat {
    const v = new Vfloat();
    v.value = Number.parseFloat(value);
    return v;
  }

  equals(other: DataValue<number>): boolean {
    return this.value === other.rawValue();
  }

  lessEquals(max: DataValue<number>): boolean {
    if (!(max instanceof Vfloat)) {
      return false;
    }

    return this.value < (<Vfloat>max).value;
  }

  validate(min: DataValue<number>, max: DataValue<number>, step?: DataValue<number>): boolean {
    return step ? this.validate3(min, max, step) : this.validate2(min, max);
  }

  private validate2(min: DataValue<number>, max: DataValue<number>): boolean {
    if (!(min instanceof Vfloat) || !(max instanceof Vfloat)) {
      return false;
    }

    const minValue = (<Vfloat>min).value;
    const maxValue = (<Vfloat>max).value;

    if (this.value < minValue || this.value > maxValue) {
      return false;
    }

    return true;
  }

  private validate3(min: DataValue<number>, max: DataValue<number>, step: DataValue<number> | null): boolean {
    if (!(min instanceof Vfloat) || !(max instanceof Vfloat) || !(step instanceof Vfloat)) {
      return false;
    }

    const minValue = (<Vfloat>min).value;
    const maxValue = (<Vfloat>max).value;
    const stepValue = (<Vfloat>step).value;

    for (let v = minValue; v < maxValue; v += stepValue) {
      if (Math.abs(v - this.value) < 0.00001) {
        return true;
      }
    }

    return false;
  }

  rawValue(): number {
    return this.value;
  }

  getFormat(): DataFormat {
    return DataFormat.FLOAT;
  }
}
