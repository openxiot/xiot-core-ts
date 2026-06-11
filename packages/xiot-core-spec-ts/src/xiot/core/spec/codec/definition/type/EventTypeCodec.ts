import {EventType} from '../../../typedef/definition/urn/EventType';

export class EventTypeCodec {
  static decodeArray(array: any[]): EventType[] {
    const list: EventType[] = [];

    if (array != null) {
      for (const v of array) {
        if (typeof v === 'string') {
          list.push(new EventType(v));
        } else if (typeof v === 'object') {
          list.push(new EventType(v.type));
        }
      }
    }

    return list;
  }

  static encodeArray(actions: EventType[]): any[] {
    const array: any[] = [];

    actions.forEach(type => {
      array.push(type.toString());
    });

    return array;
  }
}
