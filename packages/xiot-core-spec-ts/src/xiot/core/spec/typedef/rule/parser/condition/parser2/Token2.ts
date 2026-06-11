import {AbstractCondition} from '../../../condition/AbstractCondition';
import {PropertyCondition} from '../../../condition/PropertyCondition';
import {EventCondition} from '../../../condition/EventCondition';
import {ExternalCondition} from '../../../condition/ExternalCondition';

export enum Token2Type {
  PROPERTY_CONDITION,
  EXTERNAL_CONDITION,
  EVENT_CONDITION,
  COMPARISON_OPERATOR,
  LOGICAL_OPERATOR,
}

export class Token2 {
  private _type: Token2Type | undefined;
  private _condition: AbstractCondition | undefined;
  private _operator: string | undefined;

  static createWithCondition(condition: AbstractCondition): Token2 {
    let typ: Token2Type | undefined;
    if (condition instanceof PropertyCondition) {
      typ = Token2Type.PROPERTY_CONDITION;
    } else if (condition instanceof EventCondition) {
      typ = Token2Type.EVENT_CONDITION;
    } else if (condition instanceof ExternalCondition) {
      typ = Token2Type.EXTERNAL_CONDITION;
    }

    const token = new Token2(typ, '');
    token.condition = condition;

    return token;
  }


  constructor(type: Token2Type | undefined, operator: string) {
    this._type = type;
    this._operator = operator;
  }

  get type(): Token2Type {
    return <Token2Type>this._type;
  }

  set type(value: Token2Type) {
    this._type = value;
  }

  get condition(): AbstractCondition {
    return <AbstractCondition>this._condition;
  }

  set condition(value: AbstractCondition) {
    this._condition = value;
  }

  get operator(): string {
    return <string>this._operator;
  }

  set operator(value: string) {
    this._operator = value;
  }

  toString(): string {
    switch (this.type) {
      case Token2Type.PROPERTY_CONDITION:
      case Token2Type.EVENT_CONDITION:
        return this.condition.toString();

      case Token2Type.EXTERNAL_CONDITION:
        return '@' + this.condition.toString();

      case Token2Type.COMPARISON_OPERATOR:
      case Token2Type.LOGICAL_OPERATOR:
        return this.operator;

      default:
        return '?';
    }
  }
}
