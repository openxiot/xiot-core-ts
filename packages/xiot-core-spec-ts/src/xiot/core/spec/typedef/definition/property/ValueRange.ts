import { ConstraintValue } from './ConstraintValue';
import { DataFormat, DataFormatToString } from './data/DataFormat';
import { DataValue } from './data/DataValue';
import { DataValueFactory } from './data/DataValueFactory';

export class ValueRange implements ConstraintValue {
  public format: DataFormat | null = null;

  public minValue: DataValue<any> | null = null;

  public maxValue: DataValue<any> | null = null;

  public stepValue: DataValue<any> | null = null;

  public hasStep = false;

  constructor(format: DataFormat, list: any[]) {
    if (list.length === 2) {
      this.init(format, list[0], list[1], null);
    } else if (list.length === 3) {
      this.init(format, list[0], list[1], list[2]);
    } else {
      throw new Error('invalid range');
    }
  }

  private init(format: DataFormat, min: any, max: any, step: any | null) {
    this.format = format;
    this.minValue = DataValueFactory.create(format, min);
    this.maxValue = DataValueFactory.create(format, max);

    if (this.minValue == null) {
      throw new Error(`minValue invalid: ${min}`);
    }

    if (this.maxValue == null) {
      throw new Error(`maxValue invalid: ${max}`);
    }

    if (step != null) {
      this.stepValue = DataValueFactory.create(format, step);
      this.hasStep = true;
      if (this.stepValue == null) {
        throw new Error(`stepValue invalid: ${step}`);
      }
    } else {
      this.stepValue = null;
      this.hasStep = false;
    }

    if (!this.minValue.lessEquals(this.maxValue)) {
      throw new Error(`invalid value range: ${min} <= ${max} format: ${DataFormatToString(format)}`);
    }
  }

  public min(value: any): void {
    if (this.format == null) {
      return;
    }

    this.minValue = DataValueFactory.create(this.format, value);
  }

  public max(value: any): void {
    if (this.format == null) {
      return;
    }

    this.maxValue = DataValueFactory.create(this.format, value);
  }

  public step(value: any): void {
    if (this.format == null) {
      return;
    }

    this.stepValue = DataValueFactory.create(this.format, value);
  }

  validate(value: DataValue<any>): boolean {
    if (this.minValue == null) {
      console.log('validate failed, minValue is null');
      return false;
    }

    if (this.maxValue == null) {
      console.log('validate failed, maxValue is null');
      return false;
    }

    if (this.stepValue == null) {
      return value.validate(this.minValue, this.maxValue);
    }

    return value.validate(this.minValue, this.maxValue, this.stepValue);
  }

  public toList(): any[] {
    if (this.minValue == null || this.maxValue == null) {
      return [];
    }

    if (this.stepValue != null) {
      return [this.minValue.rawValue(), this.maxValue.rawValue(), this.stepValue.rawValue()];
    }
    return [this.minValue.rawValue(), this.maxValue.rawValue()];
  }

  public toString(): string {
    const array = [];

    if (this.minValue != null) {
      array.push(this.minValue.rawValue());
    }

    if (this.maxValue != null) {
      array.push(this.maxValue.rawValue());
    }

    if (this.stepValue != null) {
      array.push(this.stepValue.rawValue());
    }

    return JSON.stringify(array);
  }
}
