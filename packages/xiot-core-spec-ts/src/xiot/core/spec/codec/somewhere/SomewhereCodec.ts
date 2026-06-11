import {Somewhere} from '../../typedef/somewhere/Somewhere';
import {Where, WhereFromString} from "../../typedef/somewhere/Where";


export class SomewhereCodec {
  static decodeArray(list: any[]): Somewhere[] {
    const array = [];

    if (list != null) {
      for (const o of list) {
        array.push(SomewhereCodec.decodeObject(o));
      }
    }

    return array;
  }

  static decodeObject(o: any): Somewhere {
    const somewhere = new Somewhere();

    if (o.where !== undefined) {
      somewhere.where = WhereFromString(o.where);
    }

    if (o.spaceId !== undefined) {
      somewhere.spaceId = o.spaceId;
    }

    if (o.index !== 0) {
      somewhere.index = o.index;
    }

    return somewhere;
  }

  static encodeObject(s: Somewhere): any {
    const o: any = {};

    if (s.spaceId != null) {
      o.spaceId = s.spaceId;
    }

    if (s.where != Where.UNKNOWN) {
      o.where = s.where.toString();
    }

    if (s.index !== 0) {
      o.index = s.index;
    }

    return o;
  }

  static encodeArray(array: Array<Somewhere>): any[] {
    return array != null
      ? array.map(s => {
          return SomewhereCodec.encodeObject(s);
        })
      : [];
  }
}
