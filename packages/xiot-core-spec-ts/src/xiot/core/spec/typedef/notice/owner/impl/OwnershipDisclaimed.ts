import {OwnerNotice} from '../OwnerNotice';
import {OwnerNoticeType} from '../OwnerNoticeType';


export class OwnershipDisclaimed extends OwnerNotice {
  did: string;

  constructor(timestamp: number, appId: string, ownerId: string, userId: string, did: string) {
    super(timestamp, appId, ownerId, userId);
    this.did = did;
  }

  subType(): string {
    return OwnerNoticeType.OWNERSHIP_DISCLAIMED.toString();
  }
}
