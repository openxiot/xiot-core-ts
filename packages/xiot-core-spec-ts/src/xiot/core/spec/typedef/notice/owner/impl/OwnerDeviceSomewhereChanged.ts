import {OwnerNotice} from '../OwnerNotice';
import {OwnerNoticeType} from '../OwnerNoticeType';
import {Somewhere} from "../../../somewhere/Somewhere";

export class OwnerDeviceSomewhereChanged extends OwnerNotice {

  did: string;

  somewhere: Somewhere;

  constructor(timestamp: number, appId: string, ownerId: string, userId: string, did: string, somewhere: Somewhere) {
    super(timestamp, appId, ownerId, userId);
    this.did = did;
    this.somewhere = somewhere;
  }

  subType(): string {
    return OwnerNoticeType.DEVICE_SOMEWHERE_CHANGED.toString();
  }
}
