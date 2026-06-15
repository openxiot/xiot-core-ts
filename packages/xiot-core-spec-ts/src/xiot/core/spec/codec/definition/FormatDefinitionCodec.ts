import {FormatDefinition} from '../../typedef/definition/FormatDefinition';
import {FormatType} from '../../typedef/definition/urn/FormatType';
import {DescriptionCodec} from './DescriptionCodec';
import {Spec} from '../../typedef/constant/Spec';
import {LifeCycleFromString} from "../../typedef/lifecycle/Lifecycle";

export class FormatDefinitionCodec {
  static decodeArray(list: any[]): FormatDefinition[] {
    const array: FormatDefinition[] = [];

    if (list != null) {
      for (const o of list) {
        array.push(FormatDefinitionCodec.decode(o));
      }
    }

    return array;
  }

  static decode(o: any): FormatDefinition {
    const lifecycle = LifeCycleFromString(o[Spec.LIFECYCLE]);
    const type = FormatType.parse(o[Spec.TYPE] || '');
    const def = new FormatDefinition(type, DescriptionCodec.decode(o[Spec.DESCRIPTION]));
    def.lifecycle = lifecycle;
    return def;
  }

  static encode(def: FormatDefinition): any {
    const o: any = {
      type: def.type.toString(),
      description: DescriptionCodec.encode(def.description)
    };

    if (def.lifecycle !== undefined) {
      o[Spec.LIFECYCLE] = def.lifecycle.toString();
    }

    return o;
  }

  static encodeArray(list: FormatDefinition[]): any[] {
    return list.map(x => {
      return FormatDefinitionCodec.encode(x);
    });
  }
}
