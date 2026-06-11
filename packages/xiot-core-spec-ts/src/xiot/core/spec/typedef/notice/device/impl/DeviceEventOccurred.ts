import {DeviceNotice} from '../DeviceNotice';
import {DeviceNoticeType} from '../DeviceNoticeType';
import {EventOperation} from '../../../operation/EventOperation';

export class DeviceEventOccurred extends DeviceNotice {
  event: EventOperation;

  constructor(timestamp: number, event: EventOperation) {
    super(timestamp);
    this.event = event;
  }

  subType(): string {
    return DeviceNoticeType.EVENT_OCCURRED.toString();
  }
}
