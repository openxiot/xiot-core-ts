import {OwnerNotice} from '../OwnerNotice';
import {Summary} from '../../../summary/Summary';
import {OwnerNoticeType} from '../OwnerNoticeType';
import {Somewhere} from "../../../somewhere/Somewhere";


export class OwnerDeviceAdded extends OwnerNotice {

  did: string;

  summary: Summary;

  somewhere: Somewhere;

  constructor(
      timestamp: number,
      appId: string,
      ownerId: string,
      userId: string,
      did: string,
      summary: Summary,
      somewhere: Somewhere
  ) {
    super(timestamp, appId, ownerId, userId);
    this.did = did;
    this.summary = summary;
    this.somewhere = somewhere;
  }

  subType(): string {
    return OwnerNoticeType.DEVICE_ADDED.toString();
  }
}
