
export enum ComparisonOperator {
  UNDEFINED = '?',
  EQUAL = '==',
  GREATER = '>',
  LESS = '<',
  GREATER_OR_EQUAL = '>=',
  LESS_OR_EQUAL = '<=',
  NOT_EQUAL = '!='

}

export function getComparisonOperator(value: String) {
  switch (value) {
    case ComparisonOperator.EQUAL:
      return ComparisonOperator.EQUAL;
    case ComparisonOperator.GREATER:
      return ComparisonOperator.GREATER;
    case ComparisonOperator.LESS:
      return ComparisonOperator.LESS;
    case ComparisonOperator.GREATER_OR_EQUAL:
      return ComparisonOperator.GREATER_OR_EQUAL;
    case ComparisonOperator.LESS_OR_EQUAL:
      return ComparisonOperator.LESS_OR_EQUAL;
    case ComparisonOperator.NOT_EQUAL:
      return ComparisonOperator.NOT_EQUAL;
    default:
      return ComparisonOperator.UNDEFINED;
  }
}
