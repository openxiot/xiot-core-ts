import {Stack} from '../../../utils/Stack';
import {AbstractCondition} from '../../condition/AbstractCondition';
import {Parser2} from './parser2/Parser2';
import {Parser1} from './parser1/Parser1';
import {Token} from '../token/Token';
import {Parser0} from './parser0/Parser0';
import {Token2, Token2Type} from './parser2/Token2';
import {getLogicalOperator, LogicalOperator} from '../../condition/operator/LogicalOperator';
import {ComplexCondition} from '../../condition/ComplexCondition';

export class ConditionParser {

  private stack: Stack<AbstractCondition> = new Stack<AbstractCondition>();

  parse(expression: string): AbstractCondition {
    return <AbstractCondition>this.parseStackTokens(new Parser2().parseTokens(Parser1.parse(expression)));
  }

  parseQueueTokens(tokens: Array<Token>): AbstractCondition {
    const t = new Parser2().parseTokens(Parser1.parseTokens(new Parser0().parseTokens(tokens)));
    return <AbstractCondition>this.parseStackTokens(t);
  }

  /**
   * 将二阶逆波兰表达式合并成一个条件
   *
   * @param tokens xx
   * @return condition 条件
   */
  parseStackTokens(tokens: Stack<Token2>): AbstractCondition | undefined {
    this.stack = new Stack<AbstractCondition>();
    while (tokens.size() > 0) {
      const token = tokens.pop();
      if (token === undefined) {
        continue;
      }

      switch (token.type) {
        case Token2Type.PROPERTY_CONDITION:
        case Token2Type.EVENT_CONDITION:
        case Token2Type.EXTERNAL_CONDITION:
          this.stack.push(token.condition);
          break;

        case Token2Type.LOGICAL_OPERATOR:
          this.handleLogicalOperator(getLogicalOperator(token.operator));
          break;

        default:
          throw new Error('invalid token2: ' + token.type);
      }
    }


    if (this.stack.size() === 0) {
      return undefined;
    }
    if (this.stack.size() !== 1) {
      throw new Error('解析失败，堆栈中剩余条件: ' + this.stack.size());
    }

    return this.stack.pop();
  }

  private handleLogicalOperator(operator: LogicalOperator) {
    const condition = new ComplexCondition(operator);

    if (this.stack.size() < 2) {
      throw new Error('逻辑运算符的操作数少于2个: ' + operator.toString());
    }

    let c = this.stack.pop();
    if (c !== undefined) {
      condition.conditions.push(c);
    }
    c = this.stack.pop();
    if (c !== undefined) {
      condition.conditions.push(c);
    }

    this.stack.push(condition);
  }
}
