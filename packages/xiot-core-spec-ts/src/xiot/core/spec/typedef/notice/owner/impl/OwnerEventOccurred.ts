import {OwnerNotice} from '../OwnerNotice';
import {OwnerNoticeType} from '../OwnerNoticeType';
import {EventOperation} from '../../../operation/EventOperation';


export class OwnerEventOccurred extends OwnerNotice {
  event: EventOperation;

  constructor(timestamp: number, appId: string, ownerId: string, userId: string, event: EventOperation) {
    super(timestamp, appId, ownerId, userId);
    this.event = event;
  }

  subType(): string {
    return OwnerNoticeType.DEVICE_EVENT_OCCURRED.toString();
  }
}
