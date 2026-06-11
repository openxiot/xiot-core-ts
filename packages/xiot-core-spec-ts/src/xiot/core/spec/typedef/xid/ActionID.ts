import {XID3} from './XID3';

export class ActionID extends XID3 {
  /**
   * 处理ActionId字符串，可能抛异常
   * @param s
   */
  static parse(s: string): ActionID {
    return new ActionID(s, true);
  }

  /**
   * 创建一个新的ActionId
   */
  static create(did: string, siid: number, iid: number): ActionID {
    const aid: ActionID = new ActionID();
    aid.did = did;
    aid.siid = siid;
    aid.iid = iid;
    return aid;
  }

  toString(): string {
    return super.toString();
  }
}
