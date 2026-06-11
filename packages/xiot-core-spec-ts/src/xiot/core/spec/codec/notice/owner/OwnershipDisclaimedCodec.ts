import {OwnershipDisclaimed} from '../../../typedef/notice/owner/impl/OwnershipDisclaimed';

export class OwnershipDisclaimedCodec {
  static encode(x: OwnershipDisclaimed): any {
    return {
      timestamp: x.timestamp,
      appId: x.appId,
      ownerId: x.ownerId,
      did: x.did
    };
  }

  static decode(o: any): OwnershipDisclaimed {
    const { appId = '', ownerId = '', userId = '', did = '' } = o;
    return new OwnershipDisclaimed(o.timestamp || new Date().getTime(), appId, ownerId, userId, did);
  }
}
