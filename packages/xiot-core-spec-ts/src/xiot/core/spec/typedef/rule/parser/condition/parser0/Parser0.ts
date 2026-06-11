import {Token, TokenType} from '../../token/Token';
import {Tokenizer} from '../../token/Tokenizer';
import {ArgumentOperation} from '../../../../operation/ArgumentOperation';


export enum ParserState0 {
  INIT,               // initialize
  VALUE,              // value
  HASH,               // #
  INTEGER,            // integer
  ASSIGN,             // =
  COMMA,              // ,
}

export class Parser0 {
  private state: ParserState0 | undefined;
  private iid = 0;

  parse(expression: string): Array<Token> {
    return this.parseTokens(new Tokenizer().parse(expression));
  }

  /**
   * 将表达式中的事件值合并成: ArgumentValues
   * @param tokens 未事件值合并的表达式
   * @return tokens 事件值合并的表达式
   */
  parseTokens(tokens: Array<Token>) {
    const queue = new Array<Token>(),
      argumentArray = new Array<Token>();


    while (tokens.length > 0) {
      const token = tokens.shift();
      if (token === undefined) {
        continue;
      }

      // {
      if (token.type !== TokenType.LEFT_BRACE) {
        queue.push(token);
        continue;
      }

      argumentArray.slice(0, argumentArray.length);

      while (tokens.length > 0) {
        const t = tokens.shift();
        if (t === undefined) {
          continue;
        }

        if (t.type === TokenType.RIGHT_BRACE) {
          break;
        }

        argumentArray.push(t);
      }

      queue.push(this.createTokenArguments(argumentArray));
    }

    return queue;
  }

  private createTokenArguments(tokens: Array<Token>): Token {
    const argumentValue = new Token(TokenType.EVENT_VALUE, 0, 0);

    this.state = ParserState0.INIT;

//        console.log("createTokenArguments: " + tokens.size());

    while (tokens.length > 0) {
      const token = tokens.shift();
      if (token === undefined) {
        continue;
      }
      this.parseToken(argumentValue, token);
    }

    return argumentValue;
  }

  private parseToken(argumentValue: Token, token: Token) {
//        System.out.println("parse: " + token);

    switch (this.state) {
      case ParserState0.INIT:
        this.handleStateInit(argumentValue, token);
        break;

      case ParserState0.HASH:
        this.handleStateHASH(argumentValue, token);
        break;

      case ParserState0.INTEGER:
        this.handleStateInteger(argumentValue, token);
        break;

      case ParserState0.ASSIGN:
        this.handleStateASSIGN(argumentValue, token);
        break;

      case ParserState0.COMMA:
        this.handleStateCOMMA(argumentValue, token);
        break;

      case ParserState0.VALUE:
        this.handleStateValue(argumentValue, token);
        break;

      default:
        throw new Error('state undefined: ' + this.state);
    }
  }

  private handleStateInit(argumentValue: Token, token: Token) {
    if (token.type === TokenType.HASH) {
      this.state = ParserState0.HASH;
      return;
    }

    throw new Error('state is INIT, token expected is #, but token is ' + token.type + ': ' + token);
  }

  private handleStateHASH(argumentValue: Token, token: Token) {
    this.iid = token.getInteger();
    argumentValue.arguments.set(this.iid, new ArgumentOperation(this.iid));
    this.state = ParserState0.INTEGER;
  }

  private handleStateInteger(argumentValue: Token, token: Token) {
    if (token.type === TokenType.ASSIGNMENT) {
      this.state = ParserState0.ASSIGN;
      return;
    }

    throw new Error('state is Integer, token expected is \'=\', but token is ' + token.type + ': ' + token);
  }

  private handleStateASSIGN(argumentValue: Token, token: Token) {
    if (token.isValue()) {
      const argument = argumentValue.arguments.get(this.iid);
      if (argument === undefined) {
        throw new Error('argument is undefined, iid: ' + this.iid);
      }
      argument.values.push(token.getValue());
      this.state = ParserState0.VALUE;
      return;
    }

    throw new Error('state is NUMBER, token expected is \';\', but token is ' + token.type + ': ' + token);
  }

  private handleStateCOMMA(argumentValue: Token, token: Token) {
    if (token.type === TokenType.HASH) {
      this.state = ParserState0.HASH;
      return;
    }

    if (token.isValue()) {
      const argument = argumentValue.arguments.get(this.iid);
      if (argument === undefined) {
        throw new Error('argument is undefined, iid: ' + this.iid);
      }
      argument.values.push(token.getValue());
      this.state = ParserState0.VALUE;
      return;
    }

    throw new Error('state is \',\', token expected is # or value, but token is ' + token.type + ': ' + token);
  }

  private handleStateValue(argumentValue: Token, token: Token) {
    if (token.type === TokenType.COMMA) {
      this.state = ParserState0.COMMA;
      return;
    }

    throw new Error('state is ARGUMENT_VALUE, token expected is \',\', but token is ' + token.type + ': ' + token);
  }
}
