import {LifeCycle, LifeCycleFromString} from '../../../typedef/lifecycle/Lifecycle';
import {ObjectWithLifecycle} from '../../../typedef/lifecycle/ObjectWithLifecycle';
import {DeviceDefinition} from '../../../typedef/definition/DeviceDefinition';
import {DeviceDefinitionCodec} from '../../definition/DeviceDefinitionCodec';


export class DeviceDefinitionWithLifecycleCodec {
  static encode(obj: ObjectWithLifecycle<DeviceDefinition>) {
    return {
      lifecycle: obj.lifecycle.toString(),
      definition: DeviceDefinitionCodec.encode(obj.value)
    };
  }

  static encodeArray(resource: ObjectWithLifecycle<DeviceDefinition>[]) {
    const arr: any[] = [];
    resource.forEach(item => {
      arr.push(this.encode(item));
    });
    return arr;
  }

  static decode(o: any): ObjectWithLifecycle<DeviceDefinition> {
    const lifecycle: LifeCycle = LifeCycleFromString(o.lifecycle || '');
    const definition: any = o.definition;
    return new ObjectWithLifecycle<DeviceDefinition>(lifecycle, DeviceDefinitionCodec.decode(definition));
  }

  static decodeArray(arr: any[]): ObjectWithLifecycle<DeviceDefinition>[] {
    const list: ObjectWithLifecycle<DeviceDefinition>[] = [];
    if (arr?.length) {
      for (const o of arr) {
        if (typeof o === 'object') {
          list.push(this.decode(o));
        }
      }
    }
    return list;
  }
}
