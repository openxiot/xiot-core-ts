import {Stack} from '../../../../utils/Stack';
import {Token2, Token2Type} from './Token2';
import {ParserState2} from './ParserState2';
import {Token, TokenType} from '../../token/Token';
import {getComparisonOperator} from '../../../condition/operator/ComparisonOperator';
import {PropertyCondition} from '../../../condition/PropertyCondition';
import {AbstractCondition} from '../../../condition/AbstractCondition';
import {ExternalType} from '../../../condition/ExternalType';
import {NowCondition} from '../../../condition/NowCondition';
import {TimeCondition} from '../../../condition/TimeCondition';
import {ExternalCondition} from '../../../condition/ExternalCondition';
import {EventCondition} from '../../../condition/EventCondition';
import {EventID} from '../../../../xid/EventID';
import {PropertyID} from '../../../../xid/PropertyID';


export class Parser2 {
  private _stack: Stack<Token2> = new Stack<Token2>();
  private _state = ParserState2.INIT;
  private _id1: Token | undefined;
  private _id2: Token | undefined;
  private _value: Token | undefined;

  /**
   * 将一阶逆波兰表达式加工成二阶逆波兰表达式
   *
   * @param tokens 一阶逆波兰表达式
   * @return token2 二阶逆波兰表达式
   */
  parseTokens(tokens: Stack<Token>): Stack<Token2> {
    this._stack = new Stack();
    this._state = ParserState2.INIT;

    while (tokens.size() > 0) {
      const token = tokens.pop();
      if (token === undefined) {
        continue;
      }
      this.parseToken(token);
    }

    this._stack.reverse();

    return this._stack;
  }

  private parseToken(token: Token) {
    switch (this._state) {
      case ParserState2.INIT:
        this.handleStateInit(token);
        break;

      case ParserState2.ID1:
        this.handleStateID1(token);
        break;

      case ParserState2.ID2:
        this.handleStateID2(token);
        break;

      case ParserState2.EX_ID:
        this.handleStateEX_ID(token);
        break;

      case ParserState2.P_V:
        this.handleStateP_V(token);
        break;

      case ParserState2.EX_V:
        this.handleStateEX_V(token);
        break;

      case ParserState2.EVENT_V:
        this.handleStateEVENT_V(token);
        break;

      case ParserState2.P_C:
        this.handleStateP_C(token);
        break;

      case ParserState2.EX_C:
        this.handleStateEX_C(token);
        break;

      case ParserState2.EVENT_C:
        this.handleStateEVENT_C(token);
        break;

      case ParserState2.L:
        this.handleStateL(token);
        break;

      default:
        throw new Error('state undefined: ' + this._state);
    }
  }

  private handleStateInit(token: Token) {
    if (token.type === TokenType.XID3) {
      this._id1 = token;
      this._state = ParserState2.ID1;
      return;
    }

    if (token.type === TokenType.EXID) {
      this._id1 = token;
      this._state = ParserState2.EX_ID;
      return;
    }

    throw new Error('state is INIT, token expected is ID, but token is ' + token.type + ': ' + token);
  }

  private handleStateID1(token: Token) {
    if (token.type === TokenType.XID3) {
      this._id2 = token;
      this._state = ParserState2.ID2;
      return;
    }

    if (token.isValue()) {
      this._value = token;
      this._state = ParserState2.P_V;
      return;
    }

    if (token.type === TokenType.EVENT_VALUE) {
      this._value = token;
      this._state = ParserState2.EVENT_V;
      return;
    }

    throw new Error('state is P1, token expected is ID or Value, but token is ' + token.type + ': ' + token);
  }

  private handleStateID2(token: Token) {
    if (token.isComparisonOperator()) {
      const operator = getComparisonOperator(token.toString());
      this._stack.push(
          Token2.createWithCondition(
              new PropertyCondition(
                  Parser2.getPropertyId(this._id1),
                  Parser2.getPropertyId(this._id2),
                  operator
              )
          )
      );
      this._state = ParserState2.P_C;
      this._id1 = undefined;
      this._id2 = undefined;
      return;
    }

    throw new Error('state is P2, token expected is ComparisonOperator, but token is ' + token.type + ': ' + token);
  }

  private handleStateP_V(token: Token) {
    if (this._value === undefined) { throw new Error('Parser2: value is undefined'); }

    if (token.isComparisonOperator()) {
      const operator = getComparisonOperator(token.toString());
      this._stack.push(
          Token2.createWithCondition(
              new PropertyCondition(
                  Parser2.getPropertyId(this._id1),
                  this._value.getValue(),
                  operator
              )
          )
      );
      this._state = ParserState2.P_C;
      this._id1 = undefined;
      this._value = undefined;
      return;
    }

    throw new Error('state is P_V, token expected is ComparisonOperator, but token is ' + token.type + ': ' + token);
  }

  private handleStateEX_V(token: Token) {
    if (this._value === undefined) { throw new Error('Parser2: value is undefined'); }
    if (this._id1 === undefined) { throw new Error('Parser2: _id1 is undefined'); }
    if (token.isComparisonOperator()) {
      const operator = getComparisonOperator(token.toString());
      let condition: AbstractCondition;
      switch (this._id1.toString()) {
        case ExternalType.NOW:
          condition = new NowCondition(this._value.getValue().toString());
          break;
        case ExternalType.TIME:
          condition = new TimeCondition(this._value.getValue().toString());
          break;
        default:
          condition = new ExternalCondition(this._id1.toString(), this._value.getValue(), operator);
          break;
      }
      this._stack.push(Token2.createWithCondition(condition));
      this._state = ParserState2.EX_C;
      this._id1 = undefined;
      this._value = undefined;
      return;
    }

    throw new Error('state is EX_V, token expected is ComparisonOperator, but token is ' + token.type + ': ' + token);
  }

  private handleStateP_C(token: Token) {
    if (token.type === TokenType.XID3) {
      this._id1 = token;
      this._state = ParserState2.ID1;
      return;
    }

    if (token.type === TokenType.EXID) {
      this._id1 = token;
      this._state = ParserState2.EX_ID;
      return;
    }

    if (token.isLogicalOperator()) {
      this._stack.push(new Token2(Token2Type.LOGICAL_OPERATOR, token.toString()));
      this._state = ParserState2.L;
      return;
    }

    throw new Error('state is P_C, token expected is ID or LogicalOperator, but token is ' + token.type + ': ' + token);
  }

  private handleStateEX_ID(token: Token) {
    if (token.isValue()) {
      this._value = token;
      this._state = ParserState2.EX_V;
      return;
    }

    throw new Error('state is EX_ID, token expected is EX_V, but token is ' + token.type + ': ' + token);
  }

  private handleStateEX_C(token: Token) {
    if (token.type === TokenType.XID3) {
      this._id1 = token;
      this._state = ParserState2.ID1;
      return;
    }

    if (token.type === TokenType.EXID) {
      this._id1 = token;
      this._state = ParserState2.EX_ID;
      return;
    }

    if (token.isLogicalOperator()) {
      this._stack.push(new Token2(Token2Type.LOGICAL_OPERATOR, token.toString()));
      this._state = ParserState2.L;
      return;
    }

    throw new Error('state is EX_C, token expected is ID or LogicalOperator, but token is ' + token.type + ': ' + token);
  }

  private handleStateEVENT_C(token: Token) {
    if (token.type === TokenType.XID3) {
      this._id1 = token;
      this._state = ParserState2.ID1;
      return;
    }

    if (token.type === TokenType.EXID) {
      this._id1 = token;
      this._state = ParserState2.EX_ID;
      return;
    }

    if (token.isLogicalOperator()) {
      this._stack.push(new Token2(Token2Type.LOGICAL_OPERATOR, token.toString()));
      this._state = ParserState2.L;
      return;
    }

    throw new Error('state is EX_C, token expected is ID or LogicalOperator, but token is ' + token.type + ': ' + token);
  }

  private handleStateEVENT_V(token: Token) {
    if (token.type === TokenType.OP_EQUAL) {
      const condition = new EventCondition(Parser2.getEventId(this._id1));
      if (this._value === undefined) { throw new Error('Parser2: value is undefined'); }

      condition.arguments = this._value.arguments;
      this._stack.push(Token2.createWithCondition(condition));
      this._state = ParserState2.EVENT_C;
      this._id1 = undefined;
      this._value = undefined;
      return;
    }

    throw new Error('state is EVENT_V, token expected is \'==\', but token is ' + token.type + ': ' + token);
  }

  private handleStateL(token: Token) {
    if (token.isLogicalOperator()) {
      this._stack.push(new Token2(Token2Type.LOGICAL_OPERATOR, token.toString()));
      this._state = ParserState2.L;
      return;
    }

    if (token.type === TokenType.XID3) {
      this._id1 = token;
      this._state = ParserState2.ID1;
      return;
    }

    if (token.type === TokenType.EXID) {
      this._id1 = token;
      this._state = ParserState2.EX_ID;
      return;
    }

    throw new Error('state is L, token expected is LogicalOperator or ID, but token is ' + token.type + ': ' + token);
  }

  private static getEventId(token: Token | undefined): EventID {
    if (token === undefined) {
      throw new Error('Parser2: token is undefined');
    }
    const value = token.toString();

    if (token.type !== TokenType.XID3) {
      throw new Error('表达式错误，token不是合法的ID: ' + value);
    }

    const eid = new EventID(value);
    if (!eid.valid) {
      throw new Error('表达式错误，EID不合法: ' + value);
    }

    return eid;
  }

  private static getPropertyId(token: Token | undefined): PropertyID {
    if (token === undefined) {
      throw  new Error('Parser2: token is undefined');
    }
    const value = token.toString();

    if (token.type !== TokenType.XID3) {
      throw new Error('表达式错误，token不是合法的ID: ' + value);
    }

    const pid = new PropertyID(value);
    if (!pid.valid) {
      throw new Error('表达式错误，PID不合法: ' + value);
    }

    return pid;
  }
}
