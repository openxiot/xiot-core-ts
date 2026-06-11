import {OwnerRuleExecuted} from '../../../typedef/notice/owner/impl/OwnerRuleExecuted';
import {AbstractOperation} from '../../../typedef/operation/AbstractOperation';
import {OperationParser} from '../../../typedef/rule/parser/operation/OperationParser';

export class OwnerRuleExecutedCodec {
  static encode(x: OwnerRuleExecuted): any {
    const operations: any [] = [x.operations.length];

    for (let i = 0; i < x.operations.length; i++) {
      operations[i] = {
        operation: x.operations[i].toString(),
        status: x.operations[i].status
      };

      if (x.operations[i].status !== 0) {
        operations[i].description = x.operations[i].description;
      }
    }

    return {
      appId: x.appId,
      ownerId: x.ownerId,
      ruleId: x.ruleId,
      operations: operations,
      timestamp: x.timestamp
    };
  }

  static decode(x: any): OwnerRuleExecuted {
    const timestamp = x.timestamp | 0;
    const appId = x.appId;
    const ownerId = x.ownerId;
    const userId = x.userId;
    const ruleId = x.ruleId;
    const operations: Array<AbstractOperation> = [x.operations.length];

    if (x.operations instanceof Array) {
      const parser: OperationParser = new OperationParser();

      for (let i = 0; i < x.operations.length; i++) {
        const list: Array<AbstractOperation> = parser.parseExpression(x.operations[i].operation);
        if (list.length === 1) {
          operations[i] = list[0];
          operations[i].status = x.operations[i].status;
          operations[i].description = x.operations[i].description;
        }
      }
    }

    return new OwnerRuleExecuted(
        timestamp,
        appId,
        ownerId,
        userId,
        ruleId,
        operations
    );
  }
}
