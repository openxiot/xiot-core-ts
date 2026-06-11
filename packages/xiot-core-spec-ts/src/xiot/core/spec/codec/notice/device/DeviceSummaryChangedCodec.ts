import {DeviceSummaryChanged} from '../../../typedef/notice/device/impl/DeviceSummaryChanged';
import {SummaryCodec} from '../../summary/SummaryCodec';

export class DeviceSummaryChangedCodec {
  static encode(x: DeviceSummaryChanged): any {
    return {
      did: x.did,
      timestamp: x.timestamp,
      summary: SummaryCodec.encodeObject(x.summary)
    };
  }

  static decode(o: any): DeviceSummaryChanged {
    const x = new DeviceSummaryChanged(o.timestamp || new Date().getTime(), o.did);
    x.summary = SummaryCodec.decodeObject(o.summary || null);
    return x;
  }
}
