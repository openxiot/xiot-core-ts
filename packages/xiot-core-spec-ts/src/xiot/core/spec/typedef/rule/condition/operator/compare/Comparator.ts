import {
  CompareEqual,
  CompareNotEqual,
  CompareLess,
  CompareLessOrEqual,
  CompareGreater,
  CompareGreaterOrEqual
} from './Compare';

import { ComparisonOperator } from '../ComparisonOperator';

const compares = new Map([
  [ComparisonOperator.EQUAL, new CompareEqual()],
  [ComparisonOperator.NOT_EQUAL, new CompareNotEqual()],
  [ComparisonOperator.LESS, new CompareLess()],
  [ComparisonOperator.LESS_OR_EQUAL, new CompareLessOrEqual()],
  [ComparisonOperator.GREATER, new CompareGreater()],
  [ComparisonOperator.GREATER_OR_EQUAL, new CompareGreaterOrEqual()]
]);

export function checkCompare(operator: ComparisonOperator, left: Object, right: Object): boolean {
  const compare = compares.get(operator);
  if (compare === undefined || compare === null) {
    return false;
  }

  return compare.check(left, right);
}
