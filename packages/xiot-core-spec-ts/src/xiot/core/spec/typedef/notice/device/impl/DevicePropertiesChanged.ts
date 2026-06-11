import {DeviceNotice} from '../DeviceNotice';
import {DeviceNoticeType} from '../DeviceNoticeType';
import {PropertyOperation} from '../../../operation/PropertyOperation';

export class DevicePropertiesChanged extends DeviceNotice {
  properties: PropertyOperation[] = [];

  constructor(timestamp: number, properties: PropertyOperation[]) {
    super(timestamp);
    this.properties = properties;
  }

  subType(): string {
    return DeviceNoticeType.PROPERTIES_CHANGED.toString();
  }
}
