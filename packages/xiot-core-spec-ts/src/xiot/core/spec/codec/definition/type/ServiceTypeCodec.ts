import {ServiceType} from '../../../typedef/definition/urn/ServiceType';

export class ServiceTypeCodec {
  static decodeArray(array: any[]): ServiceType[] {
    const list: ServiceType[] = [];

    if (array != null) {
      for (const v of array) {
        if (typeof v === 'string') {
          list.push(new ServiceType(v));
        } else if (typeof v === 'object') {
          list.push(new ServiceType(v.type));
        }
      }
    }

    return list;
  }

  static encodeArray(actions: ServiceType[]): any[] {
    const array: any[] = [];

    actions.forEach(type => {
      array.push(type.toString());
    });

    return array;
  }
}
