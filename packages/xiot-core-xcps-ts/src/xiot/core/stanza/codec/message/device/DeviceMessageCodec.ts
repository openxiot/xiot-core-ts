import { DeviceNotice, DeviceNoticeCodec, DeviceNoticeTypeFromString } from '@openxiot/xiot-core-spec-ts';
import { MessageCodec } from '../../MessageCodec';
import { Message } from '../../../typedef/message/Message';
import { DeviceMessage } from '../../../typedef/message/device/DeviceMessage';

export class DeviceMessageCodec implements MessageCodec<DeviceNotice> {

  private payloadCodec = new DeviceNoticeCodec();

  decode(id: string, type: string, payload: any): Message<DeviceNotice> {
    return new DeviceMessage(id, DeviceNoticeTypeFromString(type), this.payloadCodec.decode(type, payload));
  }

  encode(message: Message<DeviceNotice>): object {
    return this.payloadCodec.encode(message.payload);
  }
}
