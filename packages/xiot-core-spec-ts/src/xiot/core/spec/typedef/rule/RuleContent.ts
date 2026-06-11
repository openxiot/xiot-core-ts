import {AbstractCondition} from './condition/AbstractCondition';
import {AbstractOperation} from '../operation/AbstractOperation';
import {OperationParser} from './parser/operation/OperationParser';
import {ComplexCondition} from './condition/ComplexCondition';


export class RuleContent {
  private _trigger: AbstractCondition | null;
  private _condition: AbstractCondition | null;
  private _operations: Array<AbstractOperation> | null;

  constructor(trigger: AbstractCondition | null,
              condition: AbstractCondition | null,
              operations: Array<AbstractOperation> | null
  ) {
    this._trigger = trigger;
    this._condition = condition;
    this._operations = operations;
  }

  get trigger(): AbstractCondition {
    return <AbstractCondition>this._trigger;
  }

  set trigger(value: AbstractCondition) {
    this._trigger = value;
  }

  get condition(): AbstractCondition {
    return <AbstractCondition>this._condition;
  }

  set condition(value: AbstractCondition) {
    this._condition = value;
  }

  get operations(): Array<AbstractOperation> | null {
    return this._operations;
  }

  set operations(value: Array<AbstractOperation> | null) {
    this._operations = value;
  }

  toString(): string {
    let str = '';

    if (this.operations !== null && this.operations !== undefined) {
      if (this.trigger === null || this.trigger === undefined) {
        str += OperationParser.toString(this.operations, false, false);
      } else {
        str = `IF ${this.addCondition(str, this.trigger)}`;

        if (this.condition !== null && this.condition !== undefined) {
          str = this.addCondition(str + ' AND ', this.condition);
        }

        str += ` THEN\n${OperationParser.toString(this.operations)}\nENDIF`;
      }
    }

    return str;
  }

  private addCondition(b: string, condition: AbstractCondition): string {
    if (condition instanceof ComplexCondition) {
      b += condition.toString();
    } else {
      b += `(${condition.toString()})`;
    }
    return b;
  }
}
