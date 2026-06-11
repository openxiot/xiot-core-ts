import {DeviceRootActive} from '../../../typedef/notice/device/impl/DeviceRootActive';
import {DeviceCodec} from '../../device/DeviceCodec';

export class DeviceRootActiveCodec {
  static encode(record: DeviceRootActive): any {
    return {
      did: record.did,
      children: DeviceCodec.encodeArray(record.children),
      timestamp: record.timestamp
    };
  }

  static decode(o: any): DeviceRootActive {
    const e = new DeviceRootActive(o.timestamp || new Date().getTime(), o.did);
    e.children = DeviceCodec.decodeArray(o.children);
    return e;
  }
}
