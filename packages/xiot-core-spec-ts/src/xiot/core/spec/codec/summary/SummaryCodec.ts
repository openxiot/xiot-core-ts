import {Summary} from '../../typedef/summary/Summary';
import {Urn} from '../../typedef/definition/urn/Urn';
import {UrnType} from '../../typedef/definition/urn/UrnType';
import {Where, WhereFromString} from "../../typedef/somewhere/Where";


export class SummaryCodec {
  static decodeArray(list: any[]): Summary[] {
    const array = [];

    if (list != null) {
      for (const o of list) {
        array.push(SummaryCodec.decodeObject(o));
      }
    }

    return array;
  }

  static decodeObject(o: any): Summary {
    const summary = new Summary();
    summary.type = new Urn([UrnType.DEVICE, UrnType.GROUP], o.type);
    summary.online = o.online;

    if (o.members !== undefined) {
      summary.members = o.members;
    }

    if (o.cloudId !== undefined) {
      summary.cloudId = o.cloudId;
    }

    if (o.parentId !== undefined) {
      summary.parentId = o.parentId;
    }

    if (o.rootId !== undefined) {
      summary.rootId = o.rootId;
    }

    if (o.protocol !== undefined) {
      summary.protocol = o.protocol;
    }

    if (o.lastOnline !== undefined) {
      summary.lastOnline = new Date(o.lastOnline);
    }

    if (o.lastOffline !== undefined) {
      summary.lastOffline = new Date(o.lastOffline);
    }

    return summary;
  }

  static encodeObject(s: Summary): any {
    const o: any = {
      type: s.type != null ? s.type.toString() : '',
      online: s.online
    };

    if (s.parentId != null) {
      o.parentId = s.parentId;
    }

    if (s.cloudId != null) {
      o.cloudId = s.cloudId;
    }

    if (s.members != null) {
      if (s.members.length > 0) {
        o.members = s.members;
      }
    }

    if (s.rootId != null) {
      o.rootId = s.rootId;
    }

    if (s.protocol != null) {
      o.protocol = s.protocol;
    }

    if (s.lastOnline !== undefined) {
      o.lastOnline = s.lastOnline.getTime();
    }

    if (s.lastOffline !== undefined) {
      o.lastOffline = s.lastOffline.getTime();
    }

    return o;
  }

  static encodeArray(array: Array<Summary>): any[] {
    return array != null
      ? array.map(s => {
          return SummaryCodec.encodeObject(s);
        })
      : [];
  }
}
