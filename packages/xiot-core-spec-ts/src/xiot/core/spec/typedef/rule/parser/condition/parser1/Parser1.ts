import {Stack} from '../../../../utils/Stack';
import {Token, TokenType} from '../../token/Token';
import {Parser0} from '../parser0/Parser0';


export class Parser1 {

  /**
   * 将表达式转为逆波兰表达式
   * @param expression 表达式
   * @return stack 逆波兰表达式
   */
  static parse(expression: string): Stack<Token> {
    return this.parseTokens(new Parser0().parse(expression));
  }


  /**
   * https://www.fatalerrors.org/index.php/a/prefix-suffix-suffix-expression-inverse-polish-expression.html
   * @param tokens 表达式
   * @return stack 逆波兰表达式
   */
  static parseTokens(tokens: Array<Token>): Stack<Token> {
    // 1 初始化2个栈：运算符栈s1和存储中间结果的栈s2
    const s1 = new Stack<Token>(),
      s2 = new Stack<Token>();

    while (tokens.length > 0) {
      // 2 从左到右扫描中缀表达式
      const token = tokens.shift();
      if (token === undefined) {
        continue;
      }

      // 3 遇到操作数，压入s2
      if (token.isOperand()) {
        s2.push(token);
        continue;
      }

      // 4 遇到运算符, 比较其与s1栈顶运算符的优先级
      if (token.isOperator()) {
        while (true) {
          // 4.1 如果s1为空，或栈顶运算符为左括号'('，则直接将此运算符入栈
          if (s1.empty() || s1.peek().type === TokenType.LEFT_PARENTHESES) {
            s1.push(token);
            break;
          } else if (token.priority() > s1.peek().priority()) {
            s1.push(token);
            break;
          }

          // 4.3 否则，将s1栈顶的运算符弹出并压入到s2中，再次转入4.1
          const t = s1.pop();
          if (t !== undefined) { s2.push(t); }
        }

        continue;
      }

      // 5 遇到括号
      if (token.isParentheses()) {

        // 5.1 如果是左括号'('，则直接压入s1
        if (token.type === TokenType.LEFT_PARENTHESES) {
          s1.push(token);
          continue;
        }

        // 5.2 如果是右括号')'，则依次弹出s1栈顶的运算符，并压入s2，直到遇到左括号'('为止，此时将这一对括号丢弃
        if (token.type === TokenType.RIGHT_PARENTHESES) {

          while (s1.size() > 0) {
            const t = s1.pop();
            if (t === undefined) {
              continue;
            }

            if (t.type === TokenType.LEFT_PARENTHESES) {
              break;
            }

            s2.push(t);
          }
        }
      }
    }

    // 7 将s1剩余的运算符依次弹出并压入s2
    while (s1.size() > 0) {
      const t = s1.pop();
      if (t === undefined) {
        continue;
      }

      s2.push(t);
    }

    // 8 依次弹出s2中的元素，结果的逆序即为中缀表达式对应的后缀表达式
    s2.reverse();

    return s2;
  }
}
