import {GroupType} from '../../../typedef/definition/urn/GroupType';

export class GroupTypeCodec {
  static decodeArray(array: any[]): GroupType[] {
    const list: GroupType[] = [];

    if (array != null) {
      for (const v of array) {
        if (typeof v === 'string') {
          list.push(new GroupType(v));
        } else if (typeof v === 'object') {
          list.push(new GroupType(v.type));
        }
      }
    }

    return list;
  }

  static encodeArray(types: GroupType[]): any[] {
    const array: any[] = [];

    types.forEach(type => {
      array.push(type.toString());
    });

    return array;
  }
}
