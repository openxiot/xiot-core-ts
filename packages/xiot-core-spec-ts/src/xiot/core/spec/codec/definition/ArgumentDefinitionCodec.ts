import {ArgumentDefinition} from '../../typedef/definition/ArgumentDefinition';
import {PropertyType} from '../../typedef/definition/urn/PropertyType';
import {Spec} from '../../typedef/constant/Spec';

export class ArgumentDefinitionCodec {
  static decodeArray(list: any[]): ArgumentDefinition[] {
    const array: ArgumentDefinition[] = [];

    if (list != null) {
      for (const o of list) {
        if (typeof o === 'string') {
          array.push(ArgumentDefinitionCodec.decodeString(o));
          continue;
        }

        if (typeof o === 'object') {
          array.push(ArgumentDefinitionCodec.decodeObject(o));
        }
      }
    }

    return array;
  }

  static decodeString(s: string): ArgumentDefinition {
    return new ArgumentDefinition(new PropertyType(s));
  }

  static decodeObject(o: any): ArgumentDefinition {
    const type: PropertyType = new PropertyType(o[Spec.PROPERTY]);
    const def = new ArgumentDefinition(type);

    const repeat = o[Spec.REPEAT];
    if (repeat != null) {
      def.minRepeat = repeat[0];
      def.maxRepeat = repeat[1];
    }

    return def;
  }

  static encode(def: ArgumentDefinition): any {
    return {
      property: def.type.toString(),
      repeat: [def.minRepeat, def.maxRepeat]
    };
  }

  static encodeArray(list: ArgumentDefinition[]): any[] {
    return list.map(x => {
      return ArgumentDefinitionCodec.encode(x);
    });
  }
}
