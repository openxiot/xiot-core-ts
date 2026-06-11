import { Stanza } from '../Stanza';
import { IQType } from './IQType';
import { StanzaType } from '../StanzaType';

// export const IQ_TYPE = 'type';
// export const IQ_METHOD = 'method';
// export const IQ_CONTENT = 'content';

export class IQ extends Stanza {

  id = '';
  type: IQType = IQType.UNDEFINED;
  content: any;

  constructor(id: string, type: IQType) {
    super(StanzaType.IQ);
    this.id = id;
    this.type = type;
  }
}
