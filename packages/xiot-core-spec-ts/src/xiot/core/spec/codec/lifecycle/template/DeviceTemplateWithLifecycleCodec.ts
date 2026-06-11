import {ObjectWithLifecycle} from '../../../typedef/lifecycle/ObjectWithLifecycle';
import {LifeCycle, LifeCycleFromString} from '../../../typedef/lifecycle/Lifecycle';
import {DeviceTemplate} from '../../../typedef/template/DeviceTemplate';
import {DeviceTemplateCodec} from '../../template/DeviceTemplateCodec';


export class DeviceTemplateWithLifecycleCodec {
  static encode(obj: ObjectWithLifecycle<DeviceTemplate>) {
    return {
      lifecycle: obj.lifecycle.toString(),
      definition: DeviceTemplateCodec.encode(obj.value)
    };
  }

  static encodeArray(resource: ObjectWithLifecycle<DeviceTemplate>[]) {
    const arr: any[] = [];
    resource.forEach(item => {
      arr.push(this.encode(item));
    });
    return arr;
  }

  static decode(o: any): ObjectWithLifecycle<DeviceTemplate> {
    const lifecycle: LifeCycle = LifeCycleFromString(o.lifecycle || '');
    const definition: any = o.definition;
    return new ObjectWithLifecycle<DeviceTemplate>(lifecycle, DeviceTemplateCodec.decode(definition));
  }

  static decodeArray(arr: any[]): ObjectWithLifecycle<DeviceTemplate>[] {
    const list: ObjectWithLifecycle<DeviceTemplate>[] = [];
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
