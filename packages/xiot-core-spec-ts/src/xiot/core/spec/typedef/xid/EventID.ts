import {XID3} from './XID3';

export class EventID extends XID3 {
  static parse(s: string): EventID {
    return new EventID(s, true);
  }

  static create(did: string, siid: number, iid: number): EventID {
    const xid: EventID = new EventID();
    xid.did = did;
    xid.siid = siid;
    xid.iid = iid;
    return xid;
  }

  toString(): string {
    return super.toString();
  }
}
