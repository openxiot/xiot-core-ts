import {DeviceChildrenRemoved} from '../../../typedef/notice/device/impl/DeviceChildrenRemoved';


export class DeviceChildrenRemovedCodec {
  static encode(x: DeviceChildrenRemoved): any {
    return {
      did: x.did,
      children: x.children,
      timestamp: x.timestamp
    };
  }

  static decode(o: any): DeviceChildrenRemoved {
    const e = new DeviceChildrenRemoved(o.timestamp || new Date().getTime(), o.did);
    e.children = o.children;
    return e;
  }
}
