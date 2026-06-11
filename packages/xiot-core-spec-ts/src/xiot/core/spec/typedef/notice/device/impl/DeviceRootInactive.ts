import {DeviceNotice} from '../DeviceNotice';
import {DeviceNoticeType} from '../DeviceNoticeType';

export class DeviceRootInactive extends DeviceNotice {
  did: string;

  constructor(timestamp: number, did: string) {
    super(timestamp);
    this.did = did;
  }

  subType(): string {
    return DeviceNoticeType.ROOT_INACTIVE.toString();
  }
}
