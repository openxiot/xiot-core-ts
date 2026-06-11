import {DeviceEventOccurred} from '../../../typedef/notice/device/impl/DeviceEventOccurred';
import {EventOperationCodec} from '../../operation/EventOperationCodec';

export class DeviceEventOccurredCodec {
  static encode(x: DeviceEventOccurred): any {
    return {
      event: EventOperationCodec.Query.encodeObject(x.event),
      timestamp: x.timestamp
    };
  }

  static decode(o: any): DeviceEventOccurred {
    const e = EventOperationCodec.Query.decodeObject(o.event);
    return new DeviceEventOccurred(o.timestamp || new Date().getTime(), e);
  }
}
