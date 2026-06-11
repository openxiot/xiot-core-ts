import {AbstractCondition} from './AbstractCondition';
import {ComparisonOperator} from './operator/ComparisonOperator';
import {PropertyID} from '../../xid/PropertyID';
import {EventOperation} from '../../operation/EventOperation';

export class ExternalCondition extends AbstractCondition {
  private _id: string;
  private _value: Object;
  private _operator: ComparisonOperator;

  constructor(id: string, value: Object, operator: ComparisonOperator) {
    super();
    this._id = id;
    this._value = value;
    this._operator = operator;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
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

  check(externalValues: Map<string, Object>, propertyValues: Map<PropertyID, Object>, event: EventOperation): boolean {
    return false;
  }

  getExternalIDList(): Array<string> {
    return [this._id];
  }

  toString(): string {
    if ('string' === typeof this._value) {
      return '@' + this._id + ' ' + this._operator.toString() + ' "' + this._value + '"';
    }

    return '@' + this._id + ' ' + this._operator.toString() + ' ' + this._value.toString();
  }
}
