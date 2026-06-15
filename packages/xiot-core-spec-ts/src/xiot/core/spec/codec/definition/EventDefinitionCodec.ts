import {EventDefinition} from '../../typedef/definition/EventDefinition';
import {EventType} from '../../typedef/definition/urn/EventType';
import {DescriptionCodec} from './DescriptionCodec';
import {ArgumentDefinitionCodec} from './ArgumentDefinitionCodec';
import {Spec} from '../../typedef/constant/Spec';
import {LifeCycleFromString} from "@openxiot/xiot-core-spec-ts/xiot/core/spec/typedef/lifecycle/Lifecycle";

export class EventDefinitionCodec {
  static decodeArray(list: any[]): EventDefinition[] {
    const array: EventDefinition[] = [];

    list.forEach(o => {
      array.push(EventDefinitionCodec.decode(o));
    });

    return array;
  }

  static decode(o: any): EventDefinition {
    const lifecycle = LifeCycleFromString(o[Spec.LIFECYCLE]);
    const type = new EventType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const list = ArgumentDefinitionCodec.decodeArray(o[Spec.ARGUMENTS]);
    const def = new EventDefinition(type, description, list);
    def.lifecycle = lifecycle;
    return def;
  }

  static encode(def: EventDefinition): any {
    const o: any = {
      type: def.type.toString(),
      description: DescriptionCodec.encode(def.description)
    };

    if (def.arguments.length > 0) {
      o[Spec.ARGUMENTS] = ArgumentDefinitionCodec.encodeArray(def.arguments);
    }

    if (def.lifecycle !== undefined) {
      o[Spec.LIFECYCLE] = def.lifecycle.toString();
    }

    return o;
  }

  static encodeArray(list: EventDefinition[]): any[] {
    return list.map(x => {
      return EventDefinitionCodec.encode(x);
    });
  }
}
