import {Spec} from '../../typedef/constant/Spec';
import {UnitDefinition} from '../../typedef/definition/UnitDefinition';
import {UnitType} from '../../typedef/definition/urn/UnitType';
import {DescriptionCodec} from './DescriptionCodec';

export class UnitDefinitionCodec {
  static decodeArray(list: any[]): UnitDefinition[] {
    const array: UnitDefinition[] = [];

    if (list != null) {
      for (const o of list) {
        array.push(UnitDefinitionCodec.decode(o));
      }
    }

    return array;
  }

  static decode(o: any): UnitDefinition {
    const type = UnitType.parse(o[Spec.TYPE] || '');
    return new UnitDefinition(type, DescriptionCodec.decode(o[Spec.DESCRIPTION]));
  }

  static encode(def: UnitDefinition): any {
    return {
      type: def.type.toString(),
      description: DescriptionCodec.encode(def.description)
    };
  }

  static encodeArray(list: UnitDefinition[]): any[] {
    return list.map(x => {
      return UnitDefinitionCodec.encode(x);
    });
  }
}
