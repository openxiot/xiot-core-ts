import {Spec} from '../../typedef/constant/Spec';
import {DeviceDefinition} from '../../typedef/definition/DeviceDefinition';
import {DeviceType} from '../../typedef/definition/urn/DeviceType';
import {DescriptionCodec} from './DescriptionCodec';
import {LifeCycle, LifeCycleFromString} from "../../typedef/lifecycle/Lifecycle";

export class DeviceDefinitionCodec {
  static decodeArray(list: any[]): DeviceDefinition[] {
    const array: DeviceDefinition[] = [];

    list.forEach(o => {
      array.push(DeviceDefinitionCodec.decode(o));
    });

    return array;
  }

  static decode(o: any): DeviceDefinition {
    const lifecycle = LifeCycleFromString(o[Spec.LIFECYCLE]);
    const type = new DeviceType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const def = new DeviceDefinition(type, description);
    def.lifecycle = lifecycle;
    return def;
  }

  static encode(def: DeviceDefinition): any {
    const o: any = {
      type: def.type.toString(),
      description: DescriptionCodec.encode(def.description)
    };

    if (def.lifecycle !== LifeCycle.UNDEFINED) {
      o[Spec.LIFECYCLE] = def.lifecycle.toString();
    }

    return o;
  }

  static encodeArray(list: DeviceDefinition[]): any[] {
    return list.map(x => {
      return DeviceDefinitionCodec.encode(x);
    });
  }
}
