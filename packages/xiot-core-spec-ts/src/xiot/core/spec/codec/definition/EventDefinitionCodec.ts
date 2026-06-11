import {EventDefinition} from '../../typedef/definition/EventDefinition';
import {EventType} from '../../typedef/definition/urn/EventType';
import {DescriptionCodec} from './DescriptionCodec';
import {ArgumentDefinitionCodec} from './ArgumentDefinitionCodec';
import {Spec} from '../../typedef/constant/Spec';

export class EventDefinitionCodec {
  static decodeArray(list: any[]): EventDefinition[] {
    const array: EventDefinition[] = [];

    list.forEach(o => {
      array.push(EventDefinitionCodec.decode(o));
    });

    return array;
  }

  static decode(o: any): EventDefinition {
    const type = new EventType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const list = ArgumentDefinitionCodec.decodeArray(o[Spec.ARGUMENTS]);
    return new EventDefinition(type, description, list);
  }

  static encode(def: EventDefinition): any {
    const o: any = {
      type: def.type.toString(),
      description: DescriptionCodec.encode(def.description)
    };

    if (def.arguments.length > 0) {
      o[Spec.ARGUMENTS] = ArgumentDefinitionCodec.encodeArray(def.arguments);
    }

    return o;
  }

  static encodeArray(list: EventDefinition[]): any[] {
    return list.map(x => {
      return EventDefinitionCodec.encode(x);
    });
  }
}
