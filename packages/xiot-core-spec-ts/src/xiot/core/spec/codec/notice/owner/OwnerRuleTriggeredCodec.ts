import {OwnerRuleTriggered} from '../../../typedef/notice/owner/impl/OwnerRuleTriggered';

export class OwnerRuleTriggeredCodec {
  static encode(x: OwnerRuleTriggered): any {
    return {
      appId: x.appId,
      ownerId: x.ownerId,
      ruleId: x.ruleId,
      timestamp: x.timestamp
    };
  }

  static decode(x: any): OwnerRuleTriggered {
    const appId = x.appId;
    const ownerId = x.ownerId;
    const userId = x.userId;
    const ruleId = x.ruleId;
    const timestamp = x.timestamp;
    return new OwnerRuleTriggered(timestamp || new Date().getTime(), appId, ownerId, userId, ruleId);
  }
}
