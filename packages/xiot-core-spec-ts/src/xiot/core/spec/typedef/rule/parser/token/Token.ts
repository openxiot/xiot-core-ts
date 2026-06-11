import {ArgumentOperation} from '../../../operation/ArgumentOperation';
import {AnyValue} from '../../../operation/value/AnyValue';
import {ReverseValue} from '../../../operation/value/ReverseValue';
import {AutoscalingValue} from '../../../operation/value/AutoscalingValue';

export enum TokenType {
  KEY_IF = 'KEY_IF',                 // IF
  KEY_THEN = 'KEY_THEN',               // THEN
  KEY_ENDIF = 'KEY_ENDIF',              // ENDIF
  KEY_AND = 'KEY_AND',                // AND
  KEY_SLEEP = 'KEY_SLEEP',              // SLEEP
  KEY_REMIND = 'KEY_REMIND',             // REMIND
  KEY_ANY = 'KEY_ANY',                // ANY
  KEY_REVERSE = 'KEY_REVERSE',            // REVERSE
  KEY_AUTOSCALING = 'KEY_AUTOSCALING',        // AUTOSCALING

  XID3 = 'XID3',                   // PropertyID, EventID
  EXID = 'EXID',                   // ExternalID

  OPERATE = 'OPERATE',                // =>

  NUMBER = 'NUMBER',                 // number, integer or float
  STRING = 'STRING',                 // string
  TRUE = 'TRUE',                   // true
  FALSE = 'FALSE',                  // false

  LEFT_PARENTHESES = 'LEFT_PARENTHESES',       // (
  RIGHT_PARENTHESES = 'RIGHT_PARENTHESES',      // )

  // logical operator
  OP_AND = 'OP_AND',                 // &&
  OP_OR = 'OP_OR',                  // ||

  // comparison operator
  OP_EQUAL = 'OP_EQUAL',               // ==
  OP_NOT_EQUAL = 'OP_NOT_EQUAL',           // !=
  OP_GREATER = 'OP_GREATER',             // >
  OP_GREATER_OR_EQUAL = 'OP_GREATER_OR_EQUAL',    // >=
  OP_LESS = 'OP_LESS',                // <
  OP_LESS_OR_EQUAL = 'OP_LESS_OR_EQUAL',       // <=

  // for event
  LEFT_BRACE = 'LEFT_BRACE',             // {
  RIGHT_BRACE = 'RIGHT_BRACE',            // }
  HASH = 'HASH',                   // #
  ASSIGNMENT = 'ASSIGNMENT',             // =
  SEMICOLON = 'SEMICOLON',              // ;
  COMMA = 'COMMA',                  // ,

  // for Parser0
  EVENT_VALUE = 'EVENT_VALUE',            // {...}
}

export class Token {
  private _type: TokenType | undefined;
  private _bytes: Array<string> | undefined;
  private _offset: number | undefined;
  private _length: number | undefined;

  // for Parser0
  readonly arguments: Map<number, ArgumentOperation> = new Map<number, ArgumentOperation>();

  constructor(type: TokenType, offset: number, length: number, bytes?: Array<string>) {
    this._type = type;
    this._offset = offset;
    this._length = length;

    if (bytes !== undefined && bytes !== null) {
      this._bytes = new Array<string>(...bytes.slice(offset, offset + length));
    }
  }

  get type(): TokenType {
    return <TokenType>this._type;
  }

  set type(value: TokenType) {
    this._type = value;
  }

  get bytes(): Array<string> {
    return <Array<string>>this._bytes;
  }

  set bytes(value: Array<string>) {
    this._bytes = value;
  }

  get offset(): number {
    return <number>this._offset;
  }

  set offset(value: number) {
    this._offset = value;
  }

  get length(): number {
    return <number>this._length;
  }

  set length(value: number) {
    this._length = value;
  }

  toString(): string {
    if (this.type == TokenType.EVENT_VALUE) {

      let b = '{';

      let i = 1;
      const size = this.arguments.size;

      for (const argument of this.arguments.values()) {
        b += argument.toString();

        if (i < size) {
          b += ', ';
        }

        i++;
      }

      b += '}';

      return b.toString();
    }

    if (this.bytes !== null && this.bytes !== undefined) {
      return this.bytes.join('');
    }

    return 'null';
  }

  /**
   * 操作数: 数值
   * @return boolean
   */
  isValue(): boolean {
    switch (this.type) {
      case TokenType.NUMBER:
      case TokenType.STRING:
      case TokenType.TRUE:
      case TokenType.FALSE:
      case TokenType.KEY_ANY:
      case TokenType.KEY_REVERSE:
      case TokenType.KEY_AUTOSCALING:
        return true;

      default:
        return false;
    }
  }

  /**
   * 运算符优先级
   * @return int
   */
  priority(): number {
    switch (this.type) {
      case TokenType.LEFT_PARENTHESES:
      case TokenType.RIGHT_PARENTHESES:
        return 4;

      case TokenType.OP_EQUAL:
      case TokenType.OP_NOT_EQUAL:
      case TokenType.OP_GREATER:
      case TokenType.OP_GREATER_OR_EQUAL:
      case TokenType.OP_LESS:
      case TokenType.OP_LESS_OR_EQUAL:
        return 2;

      case TokenType.OP_AND:
      case TokenType.OP_OR:
        return 1;

      default:
        return 0;
    }
  }

  /**
   * 运算符
   * @return boolean
   */
  isOperator(): boolean {
    switch (this.type) {
      case TokenType.OP_AND:
      case TokenType.OP_OR:
      case TokenType.OP_EQUAL:
      case TokenType.OP_NOT_EQUAL:
      case TokenType.OP_GREATER:
      case TokenType.OP_GREATER_OR_EQUAL:
      case TokenType.OP_LESS:
      case TokenType.OP_LESS_OR_EQUAL:
        return true;

      default:
        return false;
    }
  }

  /**
   * 操作数
   * @return boolean
   */
  isOperand(): boolean {
    switch (this.type) {
      case TokenType.NUMBER:
      case TokenType.STRING:
      case TokenType.TRUE:
      case TokenType.FALSE:
      case TokenType.XID3:
      case TokenType.EXID:
      case TokenType.EVENT_VALUE:
      case TokenType.KEY_ANY:
      case TokenType.KEY_REVERSE:
      case TokenType.KEY_AUTOSCALING:
        return true;

      default:
        return false;
    }
  }

  /**
   * 运算符：逻辑运算符
   * @return boolean
   */
  isLogicalOperator(): boolean {
    switch (this.type) {
      case TokenType.OP_AND:
      case TokenType.OP_OR:
        return true;

      default:
        return false;
    }
  }

  /**
   * 运算符：比较运算符
   * @return boolean
   */
  isComparisonOperator(): boolean {
    switch (this.type) {
      case TokenType.OP_EQUAL:
      case TokenType.OP_GREATER:
      case TokenType.OP_GREATER_OR_EQUAL:
      case TokenType.OP_LESS:
      case TokenType.OP_LESS_OR_EQUAL:
      case TokenType.OP_NOT_EQUAL:
        return true;

      default:
        return false;
    }
  }

  /**
   * 括号
   * @return boolean
   */
  isParentheses(): boolean {
    switch (this.type) {
      case TokenType.LEFT_PARENTHESES:
      case TokenType.RIGHT_PARENTHESES:
        return true;

      default:
        return false;
    }
  }

  getInteger(): number {
    const value = String(this.bytes.join(''));

    if (this.type !== TokenType.NUMBER) {
      throw new Error('表达式错误，token不是数值: ' + value);
    }

    if (value.indexOf('.') !== -1) {
      throw new Error('表达式错误，token不是整数: ' + value);
    }

    return parseInt(value, 10);
  }

  getString(): string {
    return String(this.bytes.join(''));
  }

  getValue(): Object {
    const value = String(this.bytes.join(''));

    switch (this.type) {
      case TokenType.NUMBER:
        if (value.indexOf('.') !== -1) {
          return parseFloat(value);
        } else {
          return parseInt(value, 10);
        }

    // BUG，居然和上面的判断是相反的
    // return value.indexOf(".") != -1 ? parseFloat(value) : parseInt(value);

      case TokenType.STRING:
        return value;

      case TokenType.TRUE:
        return true;

      case TokenType.FALSE:
        return false;

      case TokenType.KEY_ANY:
        return new AnyValue();

      case TokenType.KEY_REVERSE:
        return new ReverseValue();

      case TokenType.KEY_AUTOSCALING:
        return new AutoscalingValue();

      default:
      throw new Error('表达式错误，token不是合法的属性值: ' + value);
    }
    return [];
  }
}
