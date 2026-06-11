import {Device} from '../../typedef/device/Device';
import {SummaryCodec} from '../summary/SummaryCodec';
import {SomewhereCodec} from "../somewhere/SomewhereCodec";

export class DeviceCodec {
  static decodeArray(array: any[]): Device[] {
    return array
      ? array.map(x => {
          return DeviceCodec.decode(x);
        })
      : [];
  }

  static decode(o: any): Device {
    const device = new Device(o.did || '');

    if (o.summary) {
      device.summary = SummaryCodec.decodeObject(o.summary);
    }

    if (o.somewhere) {
      device.somewhere = SomewhereCodec.decodeObject(o.somewhere);
    }

    if (o.token) {
      device.token = o.token;
    }

    return device;
  }

  static encode(device: Device): any {
    const res: any = {
      did: device.did
    };

    if (device.summary) {
      res.summary = SummaryCodec.encodeObject(device.summary);
    }

    if (device.somewhere) {
      res.somewhere = SomewhereCodec.encodeObject(device.somewhere);
    }

    if (device.token) {
      res.token = device.token;
    }

    return res;
  }

  static encodeArray(children: Device[]): any[] {
    return children != null
      ? children.map(s => {
          return DeviceCodec.encode(s);
        })
      : [];
  }
}
