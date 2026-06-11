import {ObjectWithLifecycle} from '../../../typedef/lifecycle/ObjectWithLifecycle';
import {LifeCycle, LifeCycleFromString} from '../../../typedef/lifecycle/Lifecycle';
import {DeviceType} from '../../../typedef/definition/urn/DeviceType';


export class DeviceTypeWithLifecycleCodec {
  static encode(obj: ObjectWithLifecycle<DeviceType>) {
    return {
      lifecycle: obj.lifecycle,
      type: obj.value.toString()
    };
  }

  static encodeArray(devicesTypes: ObjectWithLifecycle<DeviceType>[]) {
    const arr: any[] = [];
    devicesTypes.forEach(item => {
      arr.push(this.encode(item));
    });
    return arr;
  }

  static decode(o: any): ObjectWithLifecycle<DeviceType> {
    const lifecycle: LifeCycle = LifeCycleFromString(o.lifecycle);
    const { type } = o;
    return new ObjectWithLifecycle<DeviceType>(lifecycle, new DeviceType(type));
  }

  static decodeArray(arr: any[]): ObjectWithLifecycle<DeviceType>[] {
    const list: ObjectWithLifecycle<DeviceType>[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.decode(o));
      }
    }
    return list;
  }
}
