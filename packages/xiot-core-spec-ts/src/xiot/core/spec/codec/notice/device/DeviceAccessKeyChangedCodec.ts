import {DeviceAccessKeyChanged} from '../../../typedef/notice/device/impl/DeviceAccessKeyChanged';

export class DeviceAccessKeyChangedCodec {
  static encode(x: DeviceAccessKeyChanged): any {
    return {
      did: x.did,
      key: x.key,
      timestamp: x.timestamp
    };
  }

  static decode(o: any): DeviceAccessKeyChanged {
    const { did } = o;
    const { key } = o;
    return new DeviceAccessKeyChanged(o.timestamp || new Date().getTime(), did, key);
  }
}
