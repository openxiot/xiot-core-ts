import {DevicePropertiesChanged} from '../../../typedef/notice/device/impl/DevicePropertiesChanged';
import {PropertyOperationCodec} from '../../operation/PropertyOperationCodec';

export class DevicePropertiesChangedCodec {
  static encode(x: DevicePropertiesChanged): any {
    return {
      properties: PropertyOperationCodec.Notify.encodeArray(x.properties),
      timestamp: x.timestamp
    };
  }

  static decode(o: any): DevicePropertiesChanged {
    const properties = PropertyOperationCodec.Notify.decodeArray(o.properties);
    return new DevicePropertiesChanged(o.timestamp || new Date().getTime(), properties);
  }
}
