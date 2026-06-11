import {DeviceNotice} from '../DeviceNotice';
import {DeviceNoticeType} from '../DeviceNoticeType';

export class DeviceAccessKeyChanged extends DeviceNotice {
  did: string;

  key: string;

  constructor(timestamp: number, did: string, key: string) {
    super(timestamp);
    this.did = did;
    this.key = key;
  }

  subType(): string {
    return DeviceNoticeType.ACCESSKEY_CHANGED.toString();
  }
}
