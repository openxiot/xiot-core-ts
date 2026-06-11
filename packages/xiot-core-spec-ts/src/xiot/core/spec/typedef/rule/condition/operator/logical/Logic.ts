import { LogicalAND, LogicalOR } from './Logical';
import { LogicalOperator } from '../LogicalOperator';

const logics = new Map([
  [LogicalOperator.AND, new LogicalAND()],
  [LogicalOperator.OR, new LogicalOR()]
]);

export function checkLogic(operator: LogicalOperator, values: Array<boolean>) {
  const logical = logics.get(operator);
  if (logical === undefined || logical === null) {
    return false;
  }

  return logical.check(values);
}
