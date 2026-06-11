import {OwnerNotice} from '../OwnerNotice';
import {OwnerNoticeType} from '../OwnerNoticeType';
import {Rule} from '../../../rule/Rule';


export class OwnerRuleAdded extends OwnerNotice {
  rule: Rule;

  constructor(timestamp: number, appId: string, ownerId: string, userId: string, rule: Rule) {
    super(timestamp, appId, ownerId, userId);
    this.rule = rule;
  }

  subType(): string {
    return OwnerNoticeType.RULE_ADDED.toString();
  }
}
