import { DeviceNotice, DeviceNoticeType, DeviceNoticeTypeFromString } from '@openxiot/xiot-core-spec-ts';
import { Message } from '../Message';

export const TOPIC_DEVICE = 'urn:xiot:device';

export class DeviceMessage extends Message<DeviceNotice> {

  constructor(id: string, type: DeviceNoticeType, payload: DeviceNotice) {
    super(id, TOPIC_DEVICE, type.toString(), payload);
  }

  public payloadType(): DeviceNoticeType {
    return DeviceNoticeTypeFromString(this.type);
  }
}
