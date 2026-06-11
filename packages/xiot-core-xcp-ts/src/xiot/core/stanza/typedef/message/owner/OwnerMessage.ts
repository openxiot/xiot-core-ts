import { OwnerNotice, OwnerNoticeType, OwnerNoticeTypeFromString } from '@gkct/xiot-core-spec-ts';
import { Message } from '../Message';

export const TOPIC_OWNER = 'urn:xiot:owner';

export class OwnerMessage extends Message<OwnerNotice> {
  constructor(id: string, type: OwnerNoticeType, payload: OwnerNotice) {
    super(id, TOPIC_OWNER, type.toString(), payload);
  }

  public payloadType(): OwnerNoticeType {
    return OwnerNoticeTypeFromString(this.type);
  }
}
