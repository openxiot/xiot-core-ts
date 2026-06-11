import { AbstractCondition } from './AbstractCondition';
import {LogicalOperator} from './operator/LogicalOperator';
import {PropertyID} from '../../xid/PropertyID';
import {EventOperation} from '../../operation/EventOperation';
import {checkLogic} from './operator/logical/Logic';


export class ComplexCondition extends AbstractCondition {
  private _conditions: Array<AbstractCondition> = [];
  private _operator: LogicalOperator;

  constructor(operator: LogicalOperator) {
    super();
    this._operator = operator;
  }

  get conditions(): Array<AbstractCondition> {
    return this._conditions;
  }

  set conditions(value: Array<AbstractCondition>) {
    this._conditions = value;
  }

  get operator(): LogicalOperator {
    return this._operator;
  }

  set operator(value: LogicalOperator) {
    this._operator = value;
  }

  toString(): string {
    let str = '(';

    for (let i = this._conditions.length - 1; i >= 0; i--) {
      const condition = this._conditions[i];
      str += condition.toString();

      if (i !== 0) {
        str += ' ' + this._operator.toString() + ' ';
      }

    }

    return str + ')';
  }

  check(externalValues: Map<string, Object>, propertyValues: Map<PropertyID, Object>, event: EventOperation): boolean {
    const result = new Array<boolean>();

    for (const condition of this._conditions) {
      result.push(condition.check(externalValues, propertyValues, event));
    }

    return checkLogic(this._operator, result);
  }


  getPropertyIDList(): Array<PropertyID> {
    const list = new Array<PropertyID>();

    for (const condition of this._conditions) {
      list.push(...condition.getPropertyIDList());
    }

    return list;
  }

  getExternalIDList(): Array<string> {
    const list = new Array<string>();

    for (const condition of this._conditions) {
      list.push(...condition.getExternalIDList());
    }

    return list;
  }
}
