import {DeviceNotice} from '../DeviceNotice';
import {DeviceNoticeType} from '../DeviceNoticeType';

export class DeviceChildrenRemoved extends DeviceNotice {
  did: string;

  children: string[] = [];

  constructor(timestamp: number, did: string) {
    super(timestamp);
    this.did = did;
  }

  subType(): string {
    return DeviceNoticeType.CHILDREN_REMOVED.toString();
  }
}
