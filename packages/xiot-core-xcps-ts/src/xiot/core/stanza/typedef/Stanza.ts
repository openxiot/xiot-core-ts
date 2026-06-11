// export const XCP_MSG_IQ = 'iq';
// export const XCP_MSG_NOTICE = 'stanza';
// export const XCP_MSG_ID = 'id';
// export const XCP_MSG_FROM = 'from';
// export const XCP_MSG_TO = 'to';

import { StanzaType } from './StanzaType'

export class Stanza {

  stanzaType: StanzaType = StanzaType.UNDEFINED;

  constructor(stanzaType: StanzaType) {
    this.stanzaType = stanzaType;
  }
}
