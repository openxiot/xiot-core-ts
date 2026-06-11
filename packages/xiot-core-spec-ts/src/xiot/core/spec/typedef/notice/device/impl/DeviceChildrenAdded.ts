import {DeviceNotice} from '../DeviceNotice';
import {DeviceNoticeType} from '../DeviceNoticeType';
import {Device} from '../../../device/Device';

export class DeviceChildrenAdded extends DeviceNotice {
  did: string;

  children: Device[] = [];

  constructor(timestamp: number, did: string) {
    super(timestamp);
    this.did = did;
  }

  subType(): string {
    return DeviceNoticeType.CHILDREN_ADDED.toString();
  }
}
