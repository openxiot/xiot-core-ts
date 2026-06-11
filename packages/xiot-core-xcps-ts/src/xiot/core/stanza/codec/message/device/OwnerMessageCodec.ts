import { OwnerNotice, OwnerNoticeCodec, OwnerNoticeTypeFromString } from '@gkct/xiot-core-spec-ts';
import { MessageCodec } from '../../MessageCodec';
import { Message } from '../../../typedef/message/Message';
import { OwnerMessage } from '../../../typedef/message/owner/OwnerMessage';

export class OwnerMessageCodec implements MessageCodec<OwnerNotice> {

  private payloadCodec = new OwnerNoticeCodec();

  decode(id: string, type: string, payload: any): Message<OwnerNotice> {
    return new OwnerMessage(id, OwnerNoticeTypeFromString(type), this.payloadCodec.decode(type, payload));
  }

  encode(message: Message<OwnerNotice>): object {
    return this.payloadCodec.encode(message.payload);
  }
}
