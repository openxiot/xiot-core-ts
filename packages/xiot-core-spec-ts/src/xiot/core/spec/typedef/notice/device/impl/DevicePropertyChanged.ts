import {DeviceNotice} from '../DeviceNotice';
import {DeviceNoticeType} from '../DeviceNoticeType';
import {PropertyOperation} from '../../../operation/PropertyOperation';

export class DevicePropertyChanged extends DeviceNotice {
  property: PropertyOperation = new PropertyOperation();

  constructor(timestamp: number, property: PropertyOperation) {
    super(timestamp);
    this.property = property;
  }

  subType(): string {
    return DeviceNoticeType.PROPERTY_CHANGED.toString();
  }
}
