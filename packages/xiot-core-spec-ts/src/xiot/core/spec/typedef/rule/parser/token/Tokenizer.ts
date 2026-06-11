import {Token, TokenType} from './Token';

export class Tokenizer {

  private tokens: Array<Token> = [];
  private bytes: Array<string> = [];
  private current = 0;

  parse(expression: string): Array<Token> {
    this.tokens = [];
    this.bytes = expression.split('');

    while (this.current < this.bytes.length) {
      this.parseToken();
    }


    return this.tokens;
  }

private parseToken() {
  switch (this.bytes[this.current]) {
    case ' ':
    case '\n':
    case '\r':
    case '\t':
      this.current++;
      break;

    case '(':
      this.parseTokenMonocase(TokenType.LEFT_PARENTHESES);
      break;

    case ')':
      this.parseTokenMonocase(TokenType.RIGHT_PARENTHESES);
      break;

    case '{':
      this.parseTokenMonocase(TokenType.LEFT_BRACE);
      break;

    case '}':
      this.parseTokenMonocase(TokenType.RIGHT_BRACE);
      break;

    case '#':
      this.parseTokenMonocase(TokenType.HASH);
      break;

    case ',':
      this.parseTokenMonocase(TokenType.COMMA);
      break;

    case ';':
      this.parseTokenMonocase(TokenType.SEMICOLON);
      break;

    case '@':
      this.parseTokenExternalID();
      break;

    case 't':
      this.parseTokenTrue();
      break;

    case 'f':
      this.parseTokenFalse();
      break;

    case 'I':
      this.parseTokenIF();
      break;

    case 'T':
      this.parseTokenTHEN();
      break;

    case 'E':
      this.parseTokenENDIF();
      break;

    case 'S':
      this.parseTokenSLEEP();
      break;

    case 'R':
      this.parseTokenREMIND_or_REVERSE();
      break;

    case 'A':
      this.parseTokenAND_or_ANY_AUTOSCALING();
      break;

    case '"':
      this.parseTokenString();
      break;

    case '-':
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      this.parseTokenNumber();
      break;

    case '&':
      this.parseTokeAnd();                  // &&
      break;

    case '|':
      this.parseTokenOR();                  // ||
      break;

    case '!':
      this.parseTokenNOT_or_NOT_EQUAL();    // ! or !=
      break;

    case '=':
      this.parseTokenEQUAL_or_ASSIGNMENT_or_OPERATE(); // ==, =>, =
      break;

    case '>':
      this.parseTokenGreater_or_GE();       // > or >=
      break;

    case '<':
      this.parseTokenLess_or_LE();          // < or <=
      break;

    default:
      this.parseTokenID3();
      break;
  }
}

private parseTokenMonocase(type: TokenType ) {
  this.tokens.push(new Token(type, this.current, 1, this.bytes));
  this.current++;
}

private parseTokenTrue() {
  if (this.bytes[this.current] !== 't' || this.bytes[this.current + 1] !== 'r'
    || this.bytes[this.current + 2] !== 'u' || this.bytes[this.current + 3] !== 'e') {
    this.parseTokenID3();
    return;
  }

  this.tokens.push(new Token(TokenType.TRUE, this.current, 4, this.bytes));
  this.current += 4;
}

private parseTokenFalse() {
  if (this.bytes[this.current] !== 'f'
      || this.bytes[this.current + 1] !== 'a'
      || this.bytes[this.current + 2] !== 'l'
      || this.bytes[this.current + 3] !== 's'
      || this.bytes[this.current + 4] !== 'e') {
    this.parseTokenID3();
    return;
  }

  this.tokens.push(new Token(TokenType.FALSE, this.current, 5, this.bytes));
  this.current += 5;
}

private parseTokenIF() {
  if (this.bytes[this.current] !== 'I' || this.bytes[this.current + 1] !== 'F') {
    this.parseTokenID3();
    return;
  }

  this.tokens.push(new Token(TokenType.KEY_IF, this.current, 2, this.bytes));
  this.current += 2;
}

private parseTokenTHEN() {
  if (this.bytes[this.current] !== 'T'
      || this.bytes[this.current + 1] !== 'H'
      || this.bytes[this.current + 2] !== 'E'
      || this.bytes[this.current + 3] !== 'N') {
    this.parseTokenID3();
    return;
  }

  this.tokens.push(new Token(TokenType.KEY_THEN, this.current, 4, this.bytes));
  this.current += 4;
}

private parseTokenENDIF() {
  if (this.bytes[this.current] !== 'E'
      || this.bytes[this.current + 1] !== 'N'
      || this.bytes[this.current + 2] !== 'D'
      || this.bytes[this.current + 3] !== 'I'
      || this.bytes[this.current + 4] !== 'F') {
    this.parseTokenID3();
    return;
  }

  this.tokens.push(new Token(TokenType.KEY_ENDIF, this.current, 5, this.bytes));
  this.current += 5;
}

private parseTokenSLEEP() {
  if (this.bytes[this.current] !== 'S'
      || this.bytes[this.current + 1] !== 'L'
      || this.bytes[this.current + 2] !== 'E'
      || this.bytes[this.current + 3] !== 'E'
      || this.bytes[this.current + 4] !== 'P') {
    this.parseTokenID3();
    return;
  }

  this.tokens.push(new Token(TokenType.KEY_SLEEP, this.current, 5, this.bytes));
  this.current += 5;
}

private parseTokenREMIND_or_REVERSE() {
  if (this.bytes[this.current] !== 'R' || this.bytes[this.current + 1] !== 'E') {
    this.parseTokenID3();
    return;
  }

  // RE + MIND
  if (this.bytes[this.current + 2] === 'M'
      && this.bytes[this.current + 3] === 'I'
      && this.bytes[this.current + 4] === 'N'
      && this.bytes[this.current + 5] === 'D') {
    this.tokens.push(new Token(TokenType.KEY_REMIND, this.current, 6, this.bytes));
    this.current += 6;
    return;
  }

  // RE + VERSE
  if (this.bytes[this.current + 2] === 'V'
      && this.bytes[this.current + 3] === 'E'
      && this.bytes[this.current + 4] === 'R'
      && this.bytes[this.current + 5] === 'S'
      && this.bytes[this.current + 6] === 'E') {
    this.tokens.push(new Token(TokenType.KEY_REVERSE, this.current, 7, this.bytes));
    this.current += 7;
    return;
  }

  this.parseTokenID3();
}

private parseTokenAND_or_ANY_AUTOSCALING() {
  if (this.bytes[this.current] !== 'A') {
    this.parseTokenID3();
    return;
  }

  // A + ND
  if (this.bytes[this.current + 1] === 'N' && this.bytes[this.current + 2] === 'D') {
    this.tokens.push(new Token(TokenType.KEY_AND, this.current, 3, this.bytes));
    this.current += 3;
    return;
  }

  // A + NY
  if (this.bytes[this.current + 1] === 'N' && this.bytes[this.current + 2] === 'Y') {
    this.tokens.push(new Token(TokenType.KEY_ANY, this.current, 3, this.bytes));
    this.current += 3;
    return;
  }

  // A + UTOSCALING
  if (this.bytes[this.current + 1] === 'U'
    && this.bytes[this.current + 2] === 'T'
    && this.bytes[this.current + 3] === 'O'
    && this.bytes[this.current + 4] === 'S'
    && this.bytes[this.current + 5] === 'C'
    && this.bytes[this.current + 6] === 'A'
    && this.bytes[this.current + 7] === 'L'
    && this.bytes[this.current + 8] === 'I'
    && this.bytes[this.current + 9] === 'N'
    && this.bytes[this.current + 10] === 'G') {
    this.tokens.push(new Token(TokenType.KEY_AUTOSCALING, this.current, 11, this.bytes));
    this.current += 11;
    return;
  }

  this.parseTokenID3();
}

private parseTokenString() {
  do {
    // 去掉左引号"
    const offset = this.current + 1;

    this.current++;

    while (true) {
      let c = this.bytes[this.current];

      if (c === '\\') {
        c = this.bytes[this.current];
        this.current++;

        switch (c) {
          case '"':
          case '\\':
          case '/':
          case 'b':
          case 'f':
          case 'n':
          case 'r':
          case 't':
            this.current++;
            break;

          case 'u':
           this.current++;

            if (this.is_hex(this.bytes[this.current]) &&
              this.is_hex(this.bytes[this.current + 1]) &&
              this.is_hex(this.bytes[this.current + 2]) &&
              this.is_hex(this.bytes[this.current + 3])) {
              this.current += 4;
            } else {
              throw new Error(`String invalid, this.current:
               ${this.current} => ${this.bytes[this.current]}${this.bytes[this.current + 2]}${this.bytes[this.current + 3]}`);
            }
            break;

          default:
            throw new Error(`String invalid, this.current: ${this.current} => ${c}`);
        }
      } else if (c === '"') {
        this.current++;
        break;
      } else if (this.is_print(c)) {
        this.current++;
      } else {
        throw new Error(`String invalid, this.current: ${this.current} => ${c}`);
      }
    }

    // 去掉右引号, length - 1
    this.tokens.push(new Token(TokenType.STRING, offset, this.current - offset - 1, this.bytes));
  } while (false);
}

private parseTokenNumber() {
  do {
    const offset = this.current;

    let c = this.bytes[this.current];

    do {
      if (c === '-') {
        this.current++;
      }

      if (this.current >= this.bytes.length) {
        throw new Error(`Number invalid, this.current: ${this.current} => ${c}`);
      }

      c = this.bytes[this.current];

      if (c === '0') {
        this.current++;
      } else if (c >= '1' && c <= '9') {
        this.current++;

        while (this.current < this.bytes.length) {
          c = this.bytes[this.current];

          if (!/^\d$/.test(c)) {
            break;
          }

          this.current++;
        }
      } else {
        throw new Error(`Number invalid, this.current: ${this.current} => ${c}`);
      }

      if (this.current >= this.bytes.length) {
        break;
      }

      c = this.bytes[this.current];

      if (c === '.') {
        this.current++;

        while (this.current < this.bytes.length) {
          c = this.bytes[this.current];

          if (!/^\d$/.test(c)) {
            break;
          }

          this.current++;
        }
      }

      if (this.current >= this.bytes.length) {
        break;
      }

      if (c === ' '
          || c === '\r'
          || c === '\n'
          || c === '\t'
          || c === '}'
          || c === ']'
          || c === ','
          || c === ')'
          || c === '='
          || c === ';') {
        break;
      } else {
        // 123456.1.1 结构，不应该识别为浮点数，应该尝试用ID的方式去识别
        this.current = offset;
        this.parseTokenID3();
        return;
      }
    } while (false);

    this.tokens.push(new Token(TokenType.NUMBER, offset, this.current - offset, this.bytes));
  } while (false);
}

private parseTokeAnd() {
  // &&
  if (this.bytes[this.current + 1] !== '&') {
    throw new Error(`AND operator invalid: ${this.bytes[this.current]}${this.bytes[this.current + 1]}`);
  }

  this.tokens.push(new Token(TokenType.OP_AND, this.current, 2, this.bytes));
  this.current += 2;
}

private parseTokenOR() {
  // ||
  if (this.bytes[this.current + 1] !== '|') {
    throw new Error(`OR operator invalid: ${this.bytes[this.current]}${this.bytes[this.current + 1]}`);
  }

  this.tokens.push(new Token(TokenType.OP_OR, this.current, 2, this.bytes));
  this.current += 2;
}

private parseTokenNOT_or_NOT_EQUAL() {
  // !=
  if (this.bytes[this.current + 1] !== '=') {
    throw new Error(`!= operator invalid: ${this.bytes[this.current]}${this.bytes[this.current + 1]}`);
  }

  this.tokens.push(new Token(TokenType.OP_NOT_EQUAL, this.current, 2, this.bytes));
  this.current += 2;
}
//
private parseTokenEQUAL_or_ASSIGNMENT_or_OPERATE() {
  // ==
  if (this.bytes[this.current + 1] === '=') {
    this.tokens.push(new Token(TokenType.OP_EQUAL, this.current, 2, this.bytes));
    this.current += 2;
    return;
  }

  if (this.bytes[this.current + 1] === '>') {
    this.tokens.push(new Token(TokenType.OPERATE, this.current, 2, this.bytes));
    this.current += 2;
    return;
  }

  this.tokens.push(new Token(TokenType.ASSIGNMENT, this.current, 1, this.bytes));
  this.current += 1;
}

private parseTokenGreater_or_GE() {
  // >=
  if (this.bytes[this.current + 1] === '=') {
    this.tokens.push(new Token(TokenType.OP_GREATER_OR_EQUAL, this.current, 2, this.bytes));
    this.current += 2;
  } else {
    this.tokens.push(new Token(TokenType.OP_GREATER, this.current, 1, this.bytes));
    this.current++;
  }
}

private parseTokenLess_or_LE() {
  // <=
  if (this.bytes[this.current + 1] === '=') {
    this.tokens.push(new Token(TokenType.OP_LESS_OR_EQUAL, this.current, 2, this.bytes));
    this.current += 2;
  } else {
    this.tokens.push(new Token(TokenType.OP_LESS, this.current, 1, this.bytes));
    this.current++;
  }
}

private parseTokenExternalID() {
  do {
    let offset = this.current;

    while (true) {
      const c = this.bytes[this.current];

      if (c === ' ' || c === '=' || c === '<' || c === '>' || c === '!' || c === ')' || c === ';' || c === '\n' || c === '\r') {
        break;
      }

      if ((c >= 'a' && c <= 'z')
        || (c >= 'A' && c <= 'Z')
        || (c >= '0' && c <= '9')
        || c === '@'
        || c === '-'
        || c === '.') {
        this.current++;
      } else {
        throw new Error(`external ID invalid, ID: ${this.current} => ${c}`);
      }
    }

    // skip '@'
    if ((this.current - offset) > 0) {
      offset++;
    }

    this.tokens.push(new Token(TokenType.EXID, offset, this.current - offset, this.bytes));
  } while (false);
}

private parseTokenID3() {
  do {
    const offset = this.current;

    while (true) {
      const c = this.bytes[this.current];

      if (c === ' ' || c === '=' || c === '<' || c === '>' || c === '!' || c === ')') {
        break;
      }

      if ((c >= 'a' && c <= 'z')
        || (c >= 'A' && c <= 'Z')
        || (c >= '0' && c <= '9')
        || c === '@'
        || c === '-'
        || c === '.') {
        this.current++;
      } else {
        throw new Error(`ID invalid, ID: ${this.current} => ${c}`);
      }
    }

    this.tokens.push(new Token(TokenType.XID3, offset, this.current - offset, this.bytes));
  } while (false);
}

private is_hex(c: string): boolean {
  return (c >= '0' && c <= '9') || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F');
}

private is_print(b: string): boolean {
  return /^[0-9a-zA-Z]*$/.test(b)
    || /\s*/.test(b) || /\n*/.test(b)
    || b === '*' || b === ',' || b === '?' || b === '-' || b === ':';
}
}
