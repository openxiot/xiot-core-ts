import { DataValue } from '../DataValue';
import { DataFormat } from '../DataFormat';

export class Vuint16 implements DataValue<number> {
  private value = 0;

  static create(value: Object): Vuint16 {
    const type = typeof value;
    if (type === 'number') {
      const v = new Vuint16();
      v.value = <number>value;
      return v;
    }

    throw new Error(`invalid value: ${value} typeof(value): ${type}`);
  }

  static fromString(value: string): Vuint16 {
    const v = new Vuint16();
    v.value = Number.parseInt(value);
    return v;
  }

  equals(other: DataValue<number>): boolean {
    return this.value === other.rawValue();
  }

  lessEquals(max: DataValue<number>): boolean {
    if (!(max instanceof Vuint16)) {
      return false;
    }

    return this.value <= (<Vuint16>max).value;
  }

  validate(min: DataValue<number>, max: DataValue<number>, step?: DataValue<number>): boolean {
    return step ? this.validate3(min, max, step) : this.validate2(min, max);
  }

  validate2(min: DataValue<number>, max: DataValue<number>): boolean {
    // if (!(min instanceof Vuint16) || !(max instanceof Vuint16)) {
    //   console.log('validate failed, minValue is null');
    //   return false;
    // }

    if (this.value < (<Vuint16>min).value) {
      console.log(`validate failed, ${this.value} < minValue(${(<Vuint16>min).value})`);
      return false;
    }

    if (this.value > (<Vuint16>max).value) {
      console.log(`validate failed, ${this.value} > maxValue(${(<Vuint16>max).value})`);
      return false;
    }

    return true;
  }

  validate3(min: DataValue<number>, max: DataValue<number>, step: DataValue<number> | null): boolean {
    // if (!(min instanceof Vuint16) || !(max instanceof Vuint16) || !(step instanceof Vuint16)) {
    //   return false;
    // }

    const minValue = (<Vuint16>min).value;
    const maxValue = (<Vuint16>max).value;
    const stepValue = (<Vuint16>step).value;

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
    return DataFormat.UINT16;
  }
}
