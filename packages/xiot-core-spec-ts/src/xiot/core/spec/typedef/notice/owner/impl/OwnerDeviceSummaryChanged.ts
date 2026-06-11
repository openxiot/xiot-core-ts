import {OwnerNotice} from '../OwnerNotice';
import {OwnerNoticeType} from '../OwnerNoticeType';
import {Summary} from '../../../summary/Summary';


export class OwnerDeviceSummaryChanged extends OwnerNotice {
  did: string;

  summary: Summary;

  constructor(timestamp: number, appId: string, ownerId: string, userId: string, did: string, summary: Summary) {
    super(timestamp, appId, ownerId, userId);
    this.did = did;
    this.summary = summary;
  }

  subType(): string {
    return OwnerNoticeType.DEVICE_SUMMARY_CHANGED.toString();
  }
}
