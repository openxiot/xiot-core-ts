import { DataValue } from '../DataValue';
import { DataFormat } from '../DataFormat';

export class Vhex implements DataValue<string> {
  private value = '00';

  static create(value: Object): Vhex {
    const type = typeof value;
    if (type === 'string') {
      const v = new Vhex();
      v.value = <string>value;
      return v;
    }

    throw new Error(`invalid value: ${value} typeof(value): ${type}`);
  }

  static fromString(value: string): Vhex {
    const v = new Vhex();
    v.value = value;
    return v;
  }

  equals(other: DataValue<string>): boolean {
    const thisValue = Number.parseInt(this.value, 16);
    const otherValue = Number.parseInt(other.rawValue(), 16);
    return thisValue === otherValue;
  }

  lessEquals(max: DataValue<string>): boolean {
    if (!(max instanceof Vhex)) {
      return false;
    }

    const thisValue = Number.parseInt(this.value, 16);
    const maxValue = Number.parseInt(max.value, 16);
    return thisValue <= maxValue;
  }

  validate(min: DataValue<string>, max: DataValue<string>, step?: DataValue<string>): boolean {
    return step ? this.validate3(min, max, step) : this.validate2(min, max);
  }

  private validate2(min: DataValue<string>, max: DataValue<string>): boolean {
    if (!(min instanceof Vhex) || !(max instanceof Vhex)) {
      console.log('validate failed, min & max not instanceof Vhex');
      return false;
    }

    const thisValue = Number.parseInt(this.value, 16);
    const minValue = Number.parseInt(min.value, 16);
    const maxValue = Number.parseInt(max.value, 16);

    if (thisValue < minValue) {
      console.log(`this.Value(${this.value}) < minValue(${min.value})`);
      return false;
    }

    if (thisValue > maxValue) {
      console.log(`this.Value(${this.value}) > maxValue(${max.value})`);
      return false;
    }

    return true;
  }

  private validate3(min: DataValue<string>, max: DataValue<string>, step: DataValue<string> | null): boolean {
    if (!(min instanceof Vhex) || !(max instanceof Vhex) || !(step instanceof Vhex)) {
      console.log('validate failed, min & max & step not instanceof Vhex');
      return false;
    }

    const thisValue = Number.parseInt(this.value, 16);
    const minValue = Number.parseInt(min.value, 16);
    const maxValue = Number.parseInt(max.value, 16);
    const stepValue = Number.parseInt(step.value, 16);

    for (let v = minValue; v < maxValue; v += stepValue) {
      if (v === thisValue) {
        return true;
      }
    }

    return false;
  }

  rawValue(): string {
    return this.value;
  }

  getFormat(): DataFormat {
    return DataFormat.HEX;
  }
}
