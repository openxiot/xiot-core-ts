import {OwnerNotice} from '../OwnerNotice';
import {OwnerNoticeType} from '../OwnerNoticeType';
import {AbstractOperation} from '../../../operation/AbstractOperation';


export class OwnerRuleExecuted extends OwnerNotice {
  ruleId: string;
  operations: AbstractOperation[];
  constructor(timestamp: number, appId: string, ownerId: string, userId: string, ruleId: string, operations: AbstractOperation[]) {
    super(timestamp, appId, ownerId, userId);
    this.ruleId = ruleId;
    this.operations = operations;
  }

  subType(): string {
    return OwnerNoticeType.RULE_EXECUTED.toString();
  }
}
