import {OwnerNotice} from '../OwnerNotice';
import {OwnerNoticeType} from '../OwnerNoticeType';
import {PropertyOperation} from '../../../operation/PropertyOperation';


export class OwnerPropertiesChanged extends OwnerNotice {
  properties: PropertyOperation[];

  constructor(timestamp: number, appId: string, ownerId: string, userId: string, properties: PropertyOperation[]) {
    super(timestamp, appId, ownerId, userId);
    this.properties = properties;
  }

  subType(): string {
    return OwnerNoticeType.DEVICE_PROPERTIES_CHANGED.toString();
  }
}
