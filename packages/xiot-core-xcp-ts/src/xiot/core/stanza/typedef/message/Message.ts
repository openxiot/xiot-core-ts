import { Notice } from '@gkct/xiot-core-spec-ts';
import { Stanza } from '../Stanza';
import { StanzaType } from '../StanzaType';

export class Message<T extends Notice> extends Stanza {

  public id = '';
  public topic = '';
  public type = '';
  public payload: T;

  constructor(id: string, topic: string, type: string, payload: T) {
    super(StanzaType.MESSAGE);
    this.id = id;
    this.topic = topic;
    this.type = type;
    this.payload = payload;
  }
}
