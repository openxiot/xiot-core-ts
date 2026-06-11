
export enum LogicalOperator {
  UNDEFINED = '?',
  AND = '&&',
  OR = '||'
}

export function getLogicalOperator(value: String): LogicalOperator {
  switch (value) {
    case LogicalOperator.UNDEFINED:
      return LogicalOperator.UNDEFINED;
    case LogicalOperator.AND:
      return LogicalOperator.AND;
    case LogicalOperator.OR:
      return LogicalOperator.OR;
    default:
      return LogicalOperator.UNDEFINED;
  }
}
