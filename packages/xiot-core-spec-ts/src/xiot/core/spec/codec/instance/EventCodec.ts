import {Spec} from '../../typedef/constant/Spec';
import {EventType} from '../../typedef/definition/urn/EventType';
import {DescriptionCodec} from '../definition/DescriptionCodec';
import {ArgumentCodec} from './ArgumentCodec';
import {Event} from '../../typedef/instance/Event';


export class EventCodec {
  static decodeArray(array: any[]): Event[] {
    const list: Event[] = [];

    if (array != null) {
      for (const o of array) {
        list.push(EventCodec.decode(o));
      }
    }

    return list;
  }

  static decode(o: any): Event {
    const iid = o[Spec.IID];
    const type = new EventType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const a = ArgumentCodec.decodeArray(o[Spec.ARGUMENTS]);
    return new Event(iid, type, description, a);
  }

  static encode(event: Event): any {
    const o: any = {
      iid: event.iid,
      type: event.type.toString(),
      description: DescriptionCodec.encode(event.description)
    };

    if (event.arguments.size > 0) {
      o[Spec.ARGUMENTS] = ArgumentCodec.encodeArray(event.getArguments());
    }

    return o;
  }

  static encodeArray(events: Map<number, Event>): any[] {
    const array: any[] = [];

    events.forEach(event => {
      array.push(EventCodec.encode(event));
    });

    return array;
  }
}
