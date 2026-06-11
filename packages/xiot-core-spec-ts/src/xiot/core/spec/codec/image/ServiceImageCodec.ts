import {Spec} from '../../typedef/constant/Spec';
import {ServiceImage} from '../../typedef/image/ServiceImage';
import {ServiceType} from '../../typedef/definition/urn/ServiceType';
import {DescriptionCodec} from '../definition/DescriptionCodec';
import {PropertyImageCodec} from './PropertyImageCodec';
import {ActionImageCodec} from './ActionImageCodec';
import {EventImageCodec} from './EventImageCodec';


export class ServiceImageCodec {
  static decodeArray(array: any[]): ServiceImage[] {
    const list: ServiceImage[] = [];

    if (array != null) {
      for (const o of array) {
        const iid = o[Spec.IID];
        const type = new ServiceType(o[Spec.TYPE]);
        const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
        const properties = PropertyImageCodec.decodeArray(o[Spec.PROPERTIES]);
        const actions = ActionImageCodec.decodeArray(o[Spec.ACTIONS]);
        const events = EventImageCodec.decodeArray(o[Spec.EVENTS]);

        // if (o[Spec.X_OPTIONAL] != null) {
        //     type._optional = o[Spec.X_OPTIONAL];
        // }

        // if (o[Spec.X_PROPERTY_ADDABLE] != null) {
        //     type._property_addable = o[Spec.X_PROPERTY_ADDABLE];
        // }
        //
        // if (o[Spec.X_ACTION_ADDABLE] != null) {
        //     type._action_addable = o[Spec.X_ACTION_ADDABLE];
        // }
        //
        // if (o[Spec.X_EVENT_ADDABLE] != null) {
        //     type._event_addable = o[Spec.X_EVENT_ADDABLE];
        // }

        list.push(new ServiceImage(iid, type, description, properties, actions, events));
      }
    }

    return list;
  }
}
