import {PropertyType} from '../../../typedef/definition/urn/PropertyType';

export class PropertyTypeCodec {
  static decodeArray(array: any[]): PropertyType[] {
    const list: PropertyType[] = [];

    if (array != null) {
      for (const v of array) {
        if (typeof v === 'string') {
          list.push(new PropertyType(v));
        } else if (typeof v === 'object') {
          list.push(new PropertyType(v.type));
        }
      }
    }

    return list;
  }

  static encodeArray(types: PropertyType[]): any[] {
    const array: any[] = [];

    types.forEach(type => {
      array.push(type.toString());
    });

    return array;
  }
}
