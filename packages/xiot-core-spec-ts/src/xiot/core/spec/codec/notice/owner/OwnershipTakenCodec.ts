import {OwnershipTaken} from '../../../typedef/notice/owner/impl/OwnershipTaken';

export class OwnershipTakenCodec {
  static encode(x: OwnershipTaken): any {
    return {
      timestamp: x.timestamp,
      appId: x.appId,
      ownerId: x.ownerId,
      did: x.did
    };
  }

  static decode(o: any): OwnershipTaken {
    const { appId = '', ownerId = '', userId = '', did = '' } = o;
    return new OwnershipTaken(o.timestamp || new Date().getTime(), appId, ownerId, userId, did);
  }
}
