import {DeviceNotice} from '../DeviceNotice';
import {DeviceNoticeType} from '../DeviceNoticeType';
import {Device} from '../../../device/Device';

export class DeviceRootActive extends DeviceNotice {
  did: string;

  children: Device[] = [];

  constructor(timestamp: number, did: string) {
    super(timestamp);
    this.did = did;
  }

  subType(): string {
    return DeviceNoticeType.ROOT_ACTIVE.toString();
  }
}
