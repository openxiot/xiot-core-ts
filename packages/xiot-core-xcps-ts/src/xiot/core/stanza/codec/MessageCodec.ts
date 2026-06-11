import { Notice } from '@gkct/xiot-core-spec-ts';
import { Message } from '../typedef/message/Message';

export interface MessageCodec<T extends Notice> {
  encode(message: Message<T>): object;

  decode(id: string, type: string, payload: any): Message<T>;
}
