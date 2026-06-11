import {Spec} from '../../typedef/constant/Spec';
import {EventImage} from '../../typedef/image/EventImage';
import {EventType} from '../../typedef/definition/urn/EventType';
import {DescriptionCodec} from '../definition/DescriptionCodec';
import {ArgumentImageCodec} from './ArgumentImageCodec';


export class EventImageCodec {
  static decodeArray(array: any[]): EventImage[] {
    const list: EventImage[] = [];

    if (array != null) {
      for (const o of array) {
        const iid = o[Spec.IID];
        const type = new EventType(o[Spec.TYPE]);
        const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
        const a = ArgumentImageCodec.decodeArray(o[Spec.ARGUMENTS]);

        // if (o[Spec.X_OPTIONAL] != null) {
        //     type._optional = o[Spec.X_OPTIONAL];
        // }

        list.push(new EventImage(iid, type, description, a));
      }
    }

    return list;
  }
}
