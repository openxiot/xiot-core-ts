import {AbstractCondition} from './AbstractCondition';
import {PropertyID} from '../../xid/PropertyID';
import {ComparisonOperator} from './operator/ComparisonOperator';
import {checkCompare} from './operator/compare/Comparator';
import {EventOperation} from '../../operation/EventOperation';

export class PropertyCondition extends AbstractCondition {
  private _pid: PropertyID;
  private _value: Object;
  private _operator: ComparisonOperator;

  constructor(pid: PropertyID, value: Object, operator: ComparisonOperator) {
    super();
    this._pid = pid;
    this._value = value;
    this._operator = operator;
  }

  get pid(): PropertyID {
    return this._pid;
  }

  set pid(value: PropertyID) {
    this._pid = value;
  }

  get value(): Object {
    return this._value;
  }

  set value(value: Object) {
    this._value = value;
  }

  get operator(): ComparisonOperator {
    return this._operator;
  }

  set operator(value: ComparisonOperator) {
    this._operator = value;
  }

  check(externalValues: Map<String, Object>, propertyValues: Map<PropertyID, Object>, event: EventOperation): boolean {
    const propertyValue = propertyValues.get(this._pid);

    if (propertyValue !== null && propertyValue !== undefined) {
      return checkCompare(this._operator, propertyValue, this._value);
    }

    return false;
  }

  getPropertyIDList(): Array<PropertyID> {
    return [this._pid];
  }

  toString(): string {
    if ('string' === typeof this._value) {
      return this._pid.toString() + ' ' + this._operator.toString() + ' "' + this._value + '"';
    }

    return this._pid.toString() + ' ' + this._operator.toString() + ' ' + this._value.toString();
  }

}
