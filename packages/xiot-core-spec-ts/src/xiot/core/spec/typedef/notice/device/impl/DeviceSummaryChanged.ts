import {DeviceNotice} from '../DeviceNotice';
import {DeviceNoticeType} from '../DeviceNoticeType';
import {Summary} from '../../../summary/Summary';

export class DeviceSummaryChanged extends DeviceNotice {
  did: string;

  summary: Summary = new Summary();

  constructor(timestamp: number, did: string) {
    super(timestamp);
    this.did = did;
  }

  subType(): string {
    return DeviceNoticeType.SUMMARY_CHANGED.toString();
  }
}
