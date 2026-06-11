import { DataValue } from './data/DataValue';

export interface ConstraintValue {
  validate(value: DataValue<any>): boolean;
}
