import {Spec} from '../../typedef/constant/Spec';
import {UnitDefinition} from '../../typedef/definition/UnitDefinition';
import {UnitType} from '../../typedef/definition/urn/UnitType';
import {DescriptionCodec} from './DescriptionCodec';
import {LifeCycleFromString} from "@openxiot/xiot-core-spec-ts/xiot/core/spec/typedef/lifecycle/Lifecycle";

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
    const lifecycle = LifeCycleFromString(o[Spec.LIFECYCLE]);
    const type = UnitType.parse(o[Spec.TYPE] || '');
    const def = new UnitDefinition(type, DescriptionCodec.decode(o[Spec.DESCRIPTION]));
    def.lifecycle = lifecycle;
    return def;
  }

  static encode(def: UnitDefinition): any {
    const o: any = {
      type: def.type.toString(),
      description: DescriptionCodec.encode(def.description)
    };

    if (def.lifecycle !== undefined) {
      o[Spec.LIFECYCLE] = def.lifecycle.toString();
    }

    return o;
  }

  static encodeArray(list: UnitDefinition[]): any[] {
    return list.map(x => {
      return UnitDefinitionCodec.encode(x);
    });
  }
}
