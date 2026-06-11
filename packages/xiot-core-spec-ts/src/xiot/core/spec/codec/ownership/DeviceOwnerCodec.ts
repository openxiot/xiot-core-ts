import {DeviceOwner} from '../../typedef/ownership/DeviceOwner';

export class DeviceOwnerCodec {
  static decode(o: any): DeviceOwner {
    const x: DeviceOwner = new DeviceOwner();
    x.appId = o.appId;
    x.ownerId = o.ownerId;
    return x;
  }

  static encode(x: DeviceOwner): any {
    return {
      appId: x.appId,
      ownerId: x.ownerId
    };
  }

  static decodeArray(arr: any[]): DeviceOwner[] {
    const list: DeviceOwner[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.decode(o));
      }
    }
    return list;
  }

  static encodeArray(x: DeviceOwner[]): any[] {
    const arr: any[] = [];
    if (x?.length) {
      for (const p of x) {
        arr.push(this.encode(p));
      }
    }
    return arr;
  }
}
