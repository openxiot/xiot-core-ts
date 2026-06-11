import {FormatDefinition} from '../../typedef/definition/FormatDefinition';
import {FormatType} from '../../typedef/definition/urn/FormatType';
import {DescriptionCodec} from './DescriptionCodec';
import {Spec} from '../../typedef/constant/Spec';

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
    const type = FormatType.parse(o[Spec.TYPE] || '');
    return new FormatDefinition(type, DescriptionCodec.decode(o[Spec.DESCRIPTION]));
  }

  static encode(def: FormatDefinition): any {
    return {
      type: def.type.toString(),
      description: DescriptionCodec.encode(def.description)
    };
  }

  static encodeArray(list: FormatDefinition[]): any[] {
    return list.map(x => {
      return FormatDefinitionCodec.encode(x);
    });
  }
}
