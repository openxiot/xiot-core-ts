import {DeviceRootInactive} from '../../../typedef/notice/device/impl/DeviceRootInactive';

export class DeviceRootInactiveCodec {
  static encode(x: DeviceRootInactive): any {
    return {
      did: x.did,
      timestamp: x.timestamp
    };
  }

  static decode(o: any): DeviceRootInactive {
    return new DeviceRootInactive(o.timestamp || new Date().getTime(), o.did);
  }
}
