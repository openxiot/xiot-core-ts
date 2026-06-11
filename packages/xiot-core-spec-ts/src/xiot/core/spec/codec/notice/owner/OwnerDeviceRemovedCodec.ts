import {OwnerDeviceRemoved} from '../../../typedef/notice/owner/impl/OwnerDeviceRemoved';

export class OwnerDeviceRemovedCodec {
  static encode(x: OwnerDeviceRemoved): any {
    return {
      timestamp: x.timestamp,
      appId: x.appId,
      ownerId: x.ownerId,
      did: x.did
    };
  }

  static decode(o: any): OwnerDeviceRemoved {
    const { appId = '', ownerId = '', userId = '', did = '' } = o;
    return new OwnerDeviceRemoved(o.timestamp || new Date().getTime(), appId, ownerId, userId, did);
  }
}
