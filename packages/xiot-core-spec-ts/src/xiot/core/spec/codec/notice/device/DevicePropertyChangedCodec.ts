import {DevicePropertyChanged} from '../../../typedef/notice/device/impl/DevicePropertyChanged';
import {PropertyOperationCodec} from '../../operation/PropertyOperationCodec';

export class DevicePropertyChangedCodec {
  static encode(x: DevicePropertyChanged): any {
    return {
      property: PropertyOperationCodec.Notify.encodeObject(x.property),
      timestamp: x.timestamp
    };
  }

  static decode(o: any): DevicePropertyChanged {
    const property = PropertyOperationCodec.Notify.decodeObject(o.property);
    return new DevicePropertyChanged(o.timestamp || new Date().getTime(), property);
  }
}
