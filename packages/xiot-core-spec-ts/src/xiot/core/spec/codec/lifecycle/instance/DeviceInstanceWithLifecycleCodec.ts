import {LifeCycle, LifeCycleFromString} from '../../../typedef/lifecycle/Lifecycle';
import {ObjectWithLifecycle} from '../../../typedef/lifecycle/ObjectWithLifecycle';
import {DeviceInstance} from '../../../typedef/instance/DeviceInstance';
import {DeviceInstanceCodec} from '../../instance/DeviceInstanceCodec';

export class DeviceInstanceWithLifecycleCodec {
  static encode(obj: ObjectWithLifecycle<DeviceInstance>) {
    return {
      lifecycle: obj.lifecycle.toString(),
      definition: DeviceInstanceCodec.encode(obj.value)
    };
  }

  static encodeArray(resource: ObjectWithLifecycle<DeviceInstance>[]) {
    const arr: any[] = [];
    resource.forEach(item => {
      arr.push(this.encode(item));
    });
    return arr;
  }

  static decode(o: any): ObjectWithLifecycle<DeviceInstance> {
    const lifecycle: LifeCycle = LifeCycleFromString(o.lifecycle || '');
    const definition: any = o.definition;
    return new ObjectWithLifecycle<DeviceInstance>(lifecycle, DeviceInstanceCodec.decode(definition));
  }

  static decodeArray(arr: any[]): ObjectWithLifecycle<DeviceInstance>[] {
    const list: ObjectWithLifecycle<DeviceInstance>[] = [];
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
