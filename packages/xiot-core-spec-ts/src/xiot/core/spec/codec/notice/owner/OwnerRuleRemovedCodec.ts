import {OwnerRuleRemoved} from '../../../typedef/notice/owner/impl/OwnerRuleRemoved';

export class OwnerRuleRemovedCodec {
  static encode(x: OwnerRuleRemoved): any {
    return {
      appId: x.appId,
      ownerId: x.ownerId,
      ruleId: x.ruleId,
      timestamp: x.timestamp
    };
  }

  static decode(x: any): OwnerRuleRemoved {
    const timestamp = x.timestamp;
    const appId = x.appId;
    const ownerId = x.ownerId;
    const userId = x.userId;
    const ruleId = x.ruleId;
    return new OwnerRuleRemoved(timestamp || new Date().getTime(), appId, ownerId, userId, ruleId);
  }
}
