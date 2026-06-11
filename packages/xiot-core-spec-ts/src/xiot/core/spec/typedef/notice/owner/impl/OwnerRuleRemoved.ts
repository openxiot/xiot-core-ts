import {OwnerNotice} from '../OwnerNotice';
import {OwnerNoticeType} from '../OwnerNoticeType';


export class OwnerRuleRemoved extends OwnerNotice {
  ruleId: string;

  constructor(timestamp: number, appId: string, ownerId: string, userId: string, ruleId: string) {
    super(timestamp, appId, ownerId, userId);
    this.ruleId = ruleId;
  }

  subType(): string {
    return OwnerNoticeType.RULE_REMOVED.toString();
  }
}
