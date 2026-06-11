import {DeviceShadow} from '../../typedef/shadow/DeviceShadow';
import {ShadowCodec} from './ShadowCodec';


export class DeviceShadowCodec {

  static encode(x: DeviceShadow): any {
    return {
      did: x.did,
      shadows: ShadowCodec.encodeArray(x.shadows)
    };
  }

  static decode(o: any): DeviceShadow {
    const device: DeviceShadow = new DeviceShadow();
    device.did = o.did;
    device.shadows = ShadowCodec.decodeArray(o.shadows);
    return device;
  }

  static encodeArray(arr: DeviceShadow[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): DeviceShadow[] {
    const instances: DeviceShadow[] = [];
    if (arr?.length) {
      for (const o of arr) {
        instances.push(this.decode(o));
      }
    }
    return instances;
  }
}
