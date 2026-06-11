
import {Spec} from '../../typedef/constant/Spec';
import {PropertyType} from '../../typedef/definition/urn/PropertyType';
import {PropertyDefinition} from '../../typedef/definition/PropertyDefinition';
import {DescriptionCodec} from './DescriptionCodec';
import {DataFormat, DataFormatFromString, DataFormatToString} from '../../typedef/definition/property/data/DataFormat';
import {Access} from '../../typedef/definition/property/Access';
import {ValueListCodec} from './ValueListCodec';
import {ValueRangeCodec} from './ValueRangeCodec';
import {ValueList} from '../../typedef/definition/property/ValueList';
import {ValueRange} from '../../typedef/definition/property/ValueRange';
import {PropertyTypeCodec} from './type/PropertyTypeCodec';


export class PropertyDefinitionCodec {
  static decodeMembers(array: any[]): PropertyType[] {
    const list: any[] = [];
    if (array?.length) {
      for (const o of array) {
        // if (typeof o === 'number') {
        //   list.push(o);
        // }
        if (typeof o === 'string') {
          list.push(new PropertyType(o));
        }
      }
    }
    return list;
  }

  static decodeArray(list: any[]): PropertyDefinition[] {
    const array: PropertyDefinition[] = [];

    list.forEach(json => {
      array.push(PropertyDefinitionCodec.decode(json));
    });

    return array;
  }

  static decode(o: any): PropertyDefinition {
    const type = new PropertyType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);

    const def: PropertyDefinition = new PropertyDefinition(type, description);

    def.format = DataFormatFromString(o[Spec.FORMAT]);
    def.access = Access.create(o[Spec.ACCESS]);
    def.unit = o[Spec.UNIT];

    if (def.format === DataFormat.COMBINATION) {
      def.members = PropertyDefinitionCodec.decodeMembers(o[Spec.MEMBERS]);
    } else {
      if (o.hasOwnProperty(Spec.VALUE_LIST) && o.hasOwnProperty(Spec.VALUE_RANGE)) {
        throw new Error('value-list & value-range both exist!');
      }

      if (o.hasOwnProperty(Spec.VALUE_LIST)) {
        def.constraintValue = ValueListCodec.decode(def.format, o[Spec.VALUE_LIST]);
      }

      if (o.hasOwnProperty(Spec.VALUE_RANGE)) {
        def.constraintValue = ValueRangeCodec.decode(def.format, o[Spec.VALUE_RANGE]);
      }
    }

    return def;
  }

  static encode(def: PropertyDefinition): any {
    const o: any = {
      type: def.type.toString(),
      description: DescriptionCodec.encode(def.description),
      format: DataFormatToString(def.format),
      access: def.access.toList()
    };

    if (def.constraintValue != null) {
      if (def.constraintValue instanceof ValueList) {
        o[Spec.VALUE_LIST] = ValueListCodec.encode(def.constraintValue);
      }

      if (def.constraintValue instanceof ValueRange) {
        o[Spec.VALUE_RANGE] = ValueRangeCodec.encode(def.constraintValue);
      }
    }

    if (def.unit != null) {
      o[Spec.UNIT] = def.unit;
    }

    if (def.members?.length > 0) {
      if (def.members[0] instanceof PropertyType) {
        o[Spec.MEMBERS] = PropertyTypeCodec.encodeArray(def.members);
      } else {
        o[Spec.MEMBERS] = def.members;
      }
    }

    return o;
  }

  static encodeArray(list: PropertyDefinition[]): any[] {
    return list.map(x => {
      return PropertyDefinitionCodec.encode(x);
    });
  }
}
