import {ServiceDefinition} from '../../typedef/definition/ServiceDefinition';
import {ServiceType} from '../../typedef/definition/urn/ServiceType';
import {DescriptionCodec} from './DescriptionCodec';
import {PropertyTypeCodec} from './type/PropertyTypeCodec';
import {ActionTypeCodec} from './type/ActionTypeCodec';
import {EventTypeCodec} from './type/EventTypeCodec';
import {Spec} from '../../typedef/constant/Spec';


export class ServiceDefinitionCodec {
  static decodeArray(list: any[]): ServiceDefinition[] {
    const array: ServiceDefinition[] = [];

    list.forEach(o => {
      array.push(ServiceDefinitionCodec.decode(o));
    });

    return array;
  }

  static decode(o: any): ServiceDefinition {
    const type = new ServiceType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const requiredProperties = PropertyTypeCodec.decodeArray(o[Spec.REQUIRED_PROPERTIES]);
    const optionalProperties = PropertyTypeCodec.decodeArray(o[Spec.OPTIONAL_PROPERTIES]);
    const requiredActions = ActionTypeCodec.decodeArray(o[Spec.REQUIRED_ACTIONS]);
    const optionalActions = ActionTypeCodec.decodeArray(o[Spec.OPTIONAL_ACTIONS]);
    const requiredEvents = EventTypeCodec.decodeArray(o[Spec.REQUIRED_EVENTS]);
    const optionalEvents = EventTypeCodec.decodeArray(o[Spec.OPTIONAL_EVENTS]);

    if (type.ns === 'homekit-spec') {
      type._property_addable = true;
      type._action_addable = false;
      type._event_addable = false;
    } else {
      type._property_addable = true;
      type._action_addable = true;
      type._event_addable = true;
    }

    return new ServiceDefinition(
      type,
      description,
      requiredProperties,
      optionalProperties,
      requiredActions,
      optionalActions,
      requiredEvents,
      optionalEvents
    );
  }

  static encode(def: ServiceDefinition): any {
    const o: any = {
      type: def.type.toString(),
      description: DescriptionCodec.encode(def.description)
    };

    if (def.requiredProperties.length > 0) {
      o[Spec.REQUIRED_PROPERTIES] = PropertyTypeCodec.encodeArray(def.requiredProperties);
    }

    if (def.optionalProperties.length > 0) {
      o[Spec.OPTIONAL_PROPERTIES] = PropertyTypeCodec.encodeArray(def.optionalProperties);
    }

    if (def.requiredActions.length > 0) {
      o[Spec.REQUIRED_ACTIONS] = ActionTypeCodec.encodeArray(def.requiredActions);
    }

    if (def.optionalActions.length > 0) {
      o[Spec.OPTIONAL_ACTIONS] = ActionTypeCodec.encodeArray(def.optionalActions);
    }

    if (def.requiredEvents.length > 0) {
      o[Spec.REQUIRED_EVENTS] = EventTypeCodec.encodeArray(def.requiredEvents);
    }

    if (def.optionalEvents.length > 0) {
      o[Spec.OPTIONAL_EVENTS] = EventTypeCodec.encodeArray(def.optionalEvents);
    }

    return o;
  }

  static encodeArray(list: ServiceDefinition[]): any[] {
    return list.map(x => {
      return ServiceDefinitionCodec.encode(x);
    });
  }
}
