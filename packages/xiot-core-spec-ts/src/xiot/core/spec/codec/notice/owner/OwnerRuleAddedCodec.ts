import {OwnerRuleAdded} from '../../../typedef/notice/owner/impl/OwnerRuleAdded';
import {RuleCodec} from '../../rule/RuleCodec';

export class OwnerRuleAddedCodec {
  static encode(x: OwnerRuleAdded): any {
    return {
      appId: x.appId,
      ownerId: x.ownerId,
      rule: RuleCodec.encode(x.rule),
      timestamp: x.timestamp
    };
  }

  static decode(x: any): OwnerRuleAdded {
    const timestamp = x.timestamp;
    const appId = x.appId;
    const ownerId = x.ownerId;
    const userId = x.userId;
    const rule = RuleCodec.decode(x.rule);
    return new OwnerRuleAdded(timestamp || new Date().getTime(), appId, ownerId, userId, rule);
  }
}
