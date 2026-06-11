import {DeviceCert} from '../../typedef/key/DeviceCert';

export class DeviceCertCodec {

  static encode(x: DeviceCert): any {
    return {
      productId: x.productId,
      serialNumber: x.serialNumber,
      cert: x.cert,
      key: x.key
    };
  }

  static decode(o: any): DeviceCert {
    const productId: string = o['productId'];
    const serialNumber: string = o['serialNumber'];
    const cert: string = o['cert'];
    const key: string = o['key'];
    return new DeviceCert(productId, serialNumber, cert, key);
  }

  static decodeArray(array: any[]): DeviceCert[] {
    return array
        ? array.map(x => {
          return DeviceCertCodec.decode(x);
        })
        : [];
  }

  static encodeArray(devices: DeviceCert[]): any[] {
    return devices != null
        ? devices.map(s => {
          return DeviceCertCodec.encode(s);
        })
        : [];
  }
}
