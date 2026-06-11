import {Spec} from '../../typedef/constant/Spec';
import {DeviceDefinition} from '../../typedef/definition/DeviceDefinition';
import {DeviceType} from '../../typedef/definition/urn/DeviceType';
import {DescriptionCodec} from './DescriptionCodec';

export class DeviceDefinitionCodec {
  static decodeArray(list: any[]): DeviceDefinition[] {
    const array: DeviceDefinition[] = [];

    list.forEach(o => {
      array.push(DeviceDefinitionCodec.decode(o));
    });

    return array;
  }

  static decode(o: any): DeviceDefinition {
    const category = o.category;
    const type = new DeviceType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    return new DeviceDefinition(category, type, description);
  }

  static encode(def: DeviceDefinition): any {
    const o: any = {
      type: def.type.toString(),
      description: DescriptionCodec.encode(def.description)
    };

    if (def.category != null) {
      o.category = def.category;
    }

    return o;
  }

  static encodeArray(list: DeviceDefinition[]): any[] {
    return list.map(x => {
      return DeviceDefinitionCodec.encode(x);
    });
  }
}
