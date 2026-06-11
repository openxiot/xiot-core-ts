import {AbstractOperation} from '../../../operation/AbstractOperation';
import {OperationState} from './OperationState';
import {XID3} from '../../../xid/XID3';
import {Tokenizer} from '../token/Tokenizer';
import {Token, TokenType} from '../token/Token';
import {SleepOperation} from '../../../operation/SleepOperation';
import {RemindOperation} from '../../../operation/RemindOperation';
import {RuleOperation} from '../../../operation/RuleOperation';
import {PropertyOperation} from '../../../operation/PropertyOperation';
import {PropertyID} from '../../../xid/PropertyID';
import {ActionOperation} from '../../../operation/ActionOperation';
import {ActionID} from '../../../xid/ActionID';
import {ArgumentOperation} from '../../../operation/ArgumentOperation';


export class OperationParser {
  private operations: Array<AbstractOperation> = [];
  private state: OperationState = OperationState.INIT;
  private operation: AbstractOperation | undefined;
  private xid: XID3 | undefined;
  private iid = 0;

  parseExpression(expression: string): Array<AbstractOperation> {
    return this.parseTokens(new Tokenizer().parse(expression));
  }

  parseTokens(tokens: Array<Token>): Array<AbstractOperation> {
    this.operations = new Array<AbstractOperation>();
    this.state = OperationState.INIT;

    while (tokens.length > 0) {
      const token = tokens.shift();
      if (token !== undefined && token !== null) {
        this.parse(token);
      }
    }

    return this.operations;
  }

  private parse(token: Token) {
      switch (this.state) {
        case OperationState.INIT:
          this.handleStateInit(token);
          break;

        case OperationState.ID_XID3:
          this.handleStateID_XID3(token);
          break;

        case OperationState.ID_SLEEP:
          this.handleStateID_SLEEP(token);
          break;

        case OperationState.ID_REMIND:
          this.handleStateID_REMIND(token);
          break;

        case OperationState.ID_SCENE:
          this.handleStateID_SCENE(token);
          break;

        case OperationState.OP_SLEEP:
          this.handleStateOP_SLEEP(token);
          break;

        case OperationState.OP_REMIND:
          this.handleStateOP_REMIND(token);
          break;

        case OperationState.OP_XID:
          this.handleStateOP_XID(token);
          break;

        case OperationState.PROPERTY_VALUE:
          this.handleStateProperty_Value(token);
          break;

        case OperationState.ARGUMENT_VALUE:
          this.handleStateArgument_Value(token);
          break;

        case OperationState.SLEEP_VALUE:
          this.handleStateSleep_Value(token);
          break;

        case OperationState.REMIND_VALUE:
          this.handleStateRemind_Value(token);
          break;

        case OperationState.SEMICOLON:
          this.handleStateSEMICOLON(token);
          break;

        case OperationState.HASH:
          this.handleStateHASH(token);
          break;

        case OperationState.INTEGER:
          this.handleStateInteger(token);
          break;

        case OperationState.ASSIGN:
          this.handleStateASSIGN(token);
          break;

        case OperationState.COMMA:
          this.handleStateCOMMA(token);
          break;

        default:
          throw new Error('state undefined: ' + this.state);
      }
    }

  private handleStateInit(token: Token) {
      if (token.type === TokenType.XID3) {
        this.parseXID(token);
        this.state = OperationState.ID_XID3;
        return;
      }

      if (token.type === TokenType.KEY_SLEEP) {
        this.operation = new SleepOperation();
        this.state = OperationState.ID_SLEEP;
        return;
      }

      if (token.type === TokenType.KEY_REMIND) {
        this.operation = new RemindOperation();
        this.state = OperationState.ID_REMIND;
        return;
      }

      if (token.type === TokenType.EXID) {
        this.operation = new RuleOperation(token.getString());
        this.state = OperationState.ID_SCENE;
        return;
      }

      throw new Error('state is INIT, token expected is ID, but token is ' + token.type + ': ' + token);
    }

  private handleStateID_XID3(token: Token) {
      if (token.type === TokenType.OPERATE) {
        this.state = OperationState.OP_XID;
        return;
      }

      throw new Error('state is ID_XID, token expected is \'=>\', but token is ' + token.type + ': ' + token);
    }

  private handleStateID_SLEEP(token: Token) {
      if (token.type === TokenType.OPERATE) {
        this.state = OperationState.OP_SLEEP;
        return;
      }

      throw new Error('state is ID_SLEEP, token expected is \'=>\', but token is ' + token.type + ': ' + token);
    }

  private handleStateID_REMIND(token: Token) {
      if (token.type === TokenType.OPERATE) {
        this.state = OperationState.OP_REMIND;
        return;
      }

      throw new Error('state is ID_REMIND, token expected is \'=>\', but token is ' + token.type + ': ' + token);
    }

  private handleStateID_SCENE(token: Token) {
      if (token.type === TokenType.SEMICOLON) {
        if (this.operation === undefined) {
          throw new Error('operation is undefined');
        }
        this.operations.push(this.operation);
        this.state = OperationState.SEMICOLON;
        return;
      }

      throw new Error('state is ID_SCENE, token expected is \';\', but token is ' + token.type + ': ' + token);
    }

  private handleStateOP_SLEEP(token: Token) {
      if (token.isValue()) {
        if (this.operation instanceof SleepOperation) {
          const o = <SleepOperation>this.operation;
          o.seconds = token.getInteger();

          this.state = OperationState.SLEEP_VALUE;
        }

        return;
      }

      throw new Error('state is OP_DELAY, token expected is Number, but token is ' + token.type + ': ' + token);
    }

  private handleStateOP_REMIND(token: Token) {
      if (token.isValue()) {
        if (this.operation instanceof RemindOperation) {
          const o = <RemindOperation>this.operation;
          o.text = token.getString();

          this.state = OperationState.REMIND_VALUE;
        }

        return;
      }

      throw new Error('state is OP_DELAY, token expected is Number, but token is ' + token.type + ': ' + token);
    }

  private handleStateOP_XID(token: Token) {
      if (token.isValue()) {
        const o = new PropertyOperation();
        if (this.xid === undefined) {
          throw new Error('xid is undefined');
        }
        o.pid = PropertyID.create(this.xid.did, this.xid.siid, this.xid.iid);
        o.value = token.getValue();
        this.operation = o;
        this.state = OperationState.PROPERTY_VALUE;
        return;
      }

      if (token.type === TokenType.HASH) {
        const o = new ActionOperation();
        if (this.xid === undefined) {
          throw new Error('xid is undefined');
        }
        o.aid = ActionID.create(this.xid.did, this.xid.siid, this.xid.iid);
        this.operation = o;
        this.state = OperationState.HASH;
        return;
      }

      throw new Error('state is OP_XID, token expected is value or #, but token is ' + token.type + ': ' + token);
    }

  private handleStateProperty_Value(token: Token) {
      if (token.type === TokenType.SEMICOLON) {
        if (this.operation === undefined) {
          throw new Error('operation is undefined');
        }
        this.operations.push(this.operation);
        this.state = OperationState.SEMICOLON;
        return;
      }

      throw new Error('state is DELAY_VALUE, token expected is \';\', but token is ' + token.type + ': ' + token);
    }

  private handleStateArgument_Value(token: Token) {
      if (token.type === TokenType.SEMICOLON) {
        if (this.operation === undefined) {
          throw new Error('operation is undefined');
        }
        this.operations.push(this.operation);
        this.state = OperationState.SEMICOLON;
        return;
      }

      if (token.type === TokenType.COMMA) {
        this.state = OperationState.COMMA;
        return;
      }

      throw new Error('state is ARGUMENT_VALUE, token expected is \';\' or \',\', but token is ' + token.type + ': ' + token);
    }

  private handleStateSleep_Value(token: Token) {
      if (token.type === TokenType.SEMICOLON) {
        if (this.operation === undefined) {
          throw new Error('operation is undefined');
        }
        this.operations.push(this.operation);
        this.state = OperationState.INIT;
        return;
      }

      throw new Error('state is SLEEP_VALUE, token expected is \';\', but token is ' + token.type + ': ' + token);
    }

  private handleStateRemind_Value(token: Token) {
      if (token.type === TokenType.SEMICOLON) {
        if (this.operation === undefined) {
          throw new Error('operation is undefined');
        }
        this.operations.push(this.operation);
        this.state = OperationState.INIT;
        return;
      }

      throw new Error('state is REMIND_VALUE, token expected is \';\', but token is ' + token.type + ': ' + token);
    }

  private handleStateSEMICOLON(token: Token) {
      this.handleStateInit(token);
  }

  private handleStateHASH(token: Token) {
      if (this.operation instanceof ActionOperation) {
        const o = <ActionOperation>this.operation;
        this.iid = token.getInteger();
        o.in.set(this.iid, new ArgumentOperation(this.iid));
        this.state = OperationState.INTEGER;
        return;
      }

      throw new Error('state is #, token expected is Integer, but token is ' + token.type + ': ' + token);
    }

  private handleStateInteger(token: Token) {
      if (token.type === TokenType.ASSIGNMENT) {
        this.state = OperationState.ASSIGN;
        return;
      }

      throw new Error('state is NUMBER, token expected is \';\', but token is ' + token.type + ': ' + token);
    }

  private handleStateASSIGN(token: Token) {
      if (token.isValue()) {
        if (this.operation instanceof ActionOperation) {
          const o = <ActionOperation>this.operation;
          const a = o.in.get(this.iid);
          if (a === undefined) {
            throw new Error(`state is ',', but argument is undefined. iid: ${this.iid}`);
          }
          a.values.push(token.getValue());
          this.state = OperationState.ARGUMENT_VALUE;
        } else {
          throw new Error('state is \'=\', but operation not ActionOperation');
        }

        return;
      }

      throw new Error('state is NUMBER, token expected is \';\', but token is ' + token.type + ': ' + token);
    }

  private handleStateCOMMA(token: Token) {
      if (token.type === TokenType.HASH) {
        this.state = OperationState.HASH;
        return;
      }

      if (token.isValue()) {
        if (this.operation instanceof ActionOperation) {
          const o = <ActionOperation>this.operation;
          const a = o.in.get(this.iid);
          if (a === undefined) {
            throw new Error(`state is ',', but argument is undefined. iid: ${this.iid}`);
          }
          a.values.push(token.getValue());
          this.state = OperationState.ARGUMENT_VALUE;
        } else {
          throw new Error('state is \',\', but operation not ActionOperation');
        }

        return;
      }

      throw new Error('state is \',\', token expected is #, but token is ' + token.type + ': ' + token);
    }

  private parseXID(token: Token) {
      const value = token.toString();

      if (token.type !== TokenType.XID3) {
        throw new Error('表达式错误，token不是合法的ID: ' + value);
      }

      this.xid = new XID3(value);
      if (!this.xid.valid) {
        throw new Error('表达式错误，XID不合法: ' + value);
      }
    }


  static toString(operations: Array<AbstractOperation>, pretty = true, tab = true): string {
    let str = '';
    let i = 1;
    const size = operations.length;

    for (const operation of operations ) {
      str += operation.toString(pretty, tab);

      if (i < size) {
        if (pretty) {
          str += '\n';
        } else {
          str += ' ';
        }
      }

      i++;
    }

    return str;
  }
}
