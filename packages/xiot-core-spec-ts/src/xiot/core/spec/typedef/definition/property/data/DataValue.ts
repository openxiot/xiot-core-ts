import { DataFormat } from './DataFormat';

export interface DataValue<T> {
  equals(other: DataValue<T>): boolean;

  lessEquals(maxValue: DataValue<T>): boolean;

  validate(min: DataValue<T>, max: DataValue<T>, step?: DataValue<T>): boolean;

  rawValue(): T;

  getFormat(): DataFormat;
}
