import {DeviceChildrenAdded} from '../../../typedef/notice/device/impl/DeviceChildrenAdded';
import {DeviceCodec} from '../../device/DeviceCodec';


export class DeviceChildrenAddedCodec {
  static encode(x: DeviceChildrenAdded): any {
    return {
      did: x.did,
      children: DeviceCodec.encodeArray(x.children),
      timestamp: x.timestamp
    };
  }

  static decode(o: any): DeviceChildrenAdded {
    const e = new DeviceChildrenAdded(o.timestamp || new Date().getTime(), o.did);
    e.children = DeviceCodec.decodeArray(o.children);
    return e;
  }
}
