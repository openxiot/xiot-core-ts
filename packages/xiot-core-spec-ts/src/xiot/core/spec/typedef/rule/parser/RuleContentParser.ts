import {RuleContent} from '../RuleContent';
import {OperationParser} from './operation/OperationParser';
import {Tokenizer} from './token/Tokenizer';
import {Token, TokenType} from './token/Token';
import {ConditionParser} from './condition/ConditionParser';

export class RuleContentParser {

  private constructor() {}

  static parse(text: string): RuleContent {
    return text.startsWith('IF') ? this.parseAutomationRule(text) : this.parseManualRule(text);
  }

  static parseManualRule(text: string): RuleContent {
    return new RuleContent(null, null, new OperationParser().parseExpression(text));
  }


  /**
   * 将tokens拆分为: triggers & conditions & operations
   * @param text 自动化文本
   * @return Automation 自动化
   */
  static parseAutomationRule(text: string): RuleContent {
    const tokens = new Tokenizer().parse(text),
      triggerTokens = new Array<Token>(),
      conditionTokens = new Array<Token>(),
      operationTokens = new Array<Token>();


    while (tokens.length > 0) {
      const token = tokens.shift();
      if (token === undefined) {
        continue;
      }

      let trigger = true;
      if (token.type === TokenType.KEY_IF) {
        while (tokens.length > 0) {
          const t = tokens.shift();
          if (t === undefined) {
            continue;
          }
          if (t.type === TokenType.KEY_THEN) {
            break;
          }

          if ( t.type === TokenType.KEY_AND) {
            trigger = false;
          }

          if (trigger) {
            triggerTokens.push(t);
          } else {
            conditionTokens.push(t);
          }
        }

        while (tokens.length > 0) {
          const t = tokens.shift();
          if (t === undefined) {
            continue;
          }
          if (t.type === TokenType.KEY_ENDIF) {
            break;
          }

          operationTokens.push(t);
        }
      }
    }

    return this.parseTokens(triggerTokens, conditionTokens, operationTokens);
  }

  private static parseTokens(triggerTokens: Array<Token>, conditionTokens: Array<Token>, operationTokens: Array<Token>): RuleContent {
    const trigger = new ConditionParser().parseQueueTokens(triggerTokens);
    const condition = new ConditionParser().parseQueueTokens(conditionTokens);
    const operations = new OperationParser().parseTokens(operationTokens);

    return new RuleContent(trigger, condition, operations);
  }
}
