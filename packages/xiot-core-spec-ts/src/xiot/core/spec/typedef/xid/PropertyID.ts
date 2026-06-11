import {XID3} from './XID3';

export class PropertyID extends XID3 {
  static parse(s: string): PropertyID {
    return new PropertyID(s, true);
  }

  static create(did: string, siid: number, iid: number): PropertyID {
    const xid: PropertyID = new PropertyID();
    xid.did = did;
    xid.siid = siid;
    xid.iid = iid;
    return xid;
  }

  toString(): string {
    return super.toString();
  }
}
