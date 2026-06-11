import {NoticeCodec} from '../../typedef/notice/NoticeCodec';
import {DeviceNotice} from '../../typedef/notice/device/DeviceNotice';
import {DeviceNoticeType, DeviceNoticeTypeFromString} from '../../typedef/notice/device/DeviceNoticeType';
import {DeviceAccessKeyChangedCodec} from './device/DeviceAccessKeyChangedCodec';
import {DeviceAccessKeyChanged} from '../../typedef/notice/device/impl/DeviceAccessKeyChanged';
import {DeviceChildrenAdded} from '../../typedef/notice/device/impl/DeviceChildrenAdded';
import {DeviceChildrenAddedCodec} from './device/DeviceChildrenAddedCodec';
import {DeviceChildrenRemoved} from '../../typedef/notice/device/impl/DeviceChildrenRemoved';
import {DeviceChildrenRemovedCodec} from './device/DeviceChildrenRemovedCodec';
import {DevicePropertiesChanged} from '../../typedef/notice/device/impl/DevicePropertiesChanged';
import {DevicePropertiesChangedCodec} from './device/DevicePropertiesChangedCodec';
import {DevicePropertyChanged} from '../../typedef/notice/device/impl/DevicePropertyChanged';
import {DevicePropertyChangedCodec} from './device/DevicePropertyChangedCodec';
import {DeviceEventOccurred} from '../../typedef/notice/device/impl/DeviceEventOccurred';
import {DeviceEventOccurredCodec} from './device/DeviceEventOccurredCodec';
import {DeviceRootActive} from '../../typedef/notice/device/impl/DeviceRootActive';
import {DeviceRootActiveCodec} from './device/DeviceRootActiveCodec';
import {DeviceRootInactive} from '../../typedef/notice/device/impl/DeviceRootInactive';
import {DeviceRootInactiveCodec} from './device/DeviceRootInactiveCodec';
import {DeviceSummaryChanged} from '../../typedef/notice/device/impl/DeviceSummaryChanged';
import {DeviceSummaryChangedCodec} from './device/DeviceSummaryChangedCodec';


export class DeviceNoticeCodec extends NoticeCodec<DeviceNotice, any> {
  mainType(): string {
    return 'device';
  }

  encode(x: DeviceNotice): any {
    let o: any = {};

    switch (DeviceNoticeTypeFromString(x.subType())) {
      case DeviceNoticeType.UNDEFINED:
        break;
      case DeviceNoticeType.ACCESSKEY_CHANGED:
        if (x instanceof DeviceAccessKeyChanged) {
          o = DeviceAccessKeyChangedCodec.encode(x);
        }
        break;

      case DeviceNoticeType.CHILDREN_ADDED:
        if (x instanceof DeviceChildrenAdded) {
          o = DeviceChildrenAddedCodec.encode(x);
        }
        break;

      case DeviceNoticeType.CHILDREN_REMOVED:
        if (x instanceof DeviceChildrenRemoved) {
          o = DeviceChildrenRemovedCodec.encode(x);
        }
        break;

      case DeviceNoticeType.PROPERTIES_CHANGED:
        if (x instanceof DevicePropertiesChanged) {
          o = DevicePropertiesChangedCodec.encode(x);
        }
        break;

      case DeviceNoticeType.PROPERTY_CHANGED:
        if (x instanceof DevicePropertyChanged) {
          o = DevicePropertyChangedCodec.encode(x);
        }
        break;

      case DeviceNoticeType.EVENT_OCCURRED:
        if (x instanceof DeviceEventOccurred) {
          o = DeviceEventOccurredCodec.encode(x);
        }
        break;

      case DeviceNoticeType.ROOT_ACTIVE:
        if (x instanceof DeviceRootActive) {
          o = DeviceRootActiveCodec.encode(x);
        }
        break;

      case DeviceNoticeType.ROOT_INACTIVE:
        if (x instanceof DeviceRootInactive) {
          o = DeviceRootInactiveCodec.encode(x);
        }
        break;

      case DeviceNoticeType.SUMMARY_CHANGED:
        if (x instanceof DeviceSummaryChanged) {
          o = DeviceSummaryChangedCodec.encode(x);
        }
        break;

      default:
        break;
    }

    return o;
  }

  decode(subType: string, o: any): DeviceNotice {
    let notice: DeviceNotice;

    switch (subType) {
      case DeviceNoticeType.ACCESSKEY_CHANGED:
        notice = DeviceAccessKeyChangedCodec.decode(o);
        break;

      case DeviceNoticeType.CHILDREN_ADDED:
        notice = DeviceChildrenAddedCodec.decode(o);
        break;

      case DeviceNoticeType.CHILDREN_REMOVED:
        notice = DeviceChildrenRemovedCodec.decode(o);
        break;

      case DeviceNoticeType.EVENT_OCCURRED:
        notice = DeviceEventOccurredCodec.decode(o);
        break;

      case DeviceNoticeType.PROPERTIES_CHANGED:
        notice = DevicePropertiesChangedCodec.decode(o);
        break;

      case DeviceNoticeType.PROPERTY_CHANGED:
        notice = DevicePropertyChangedCodec.decode(o);
        break;

      case DeviceNoticeType.ROOT_ACTIVE:
        notice = DeviceRootActiveCodec.decode(o);
        break;

      case DeviceNoticeType.ROOT_INACTIVE:
        notice = DeviceRootInactiveCodec.decode(o);
        break;

      case DeviceNoticeType.SUMMARY_CHANGED:
        notice = DeviceSummaryChangedCodec.decode(o);
        break;

      default:
        throw new Error(`invalid subType: ${subType}`);
    }

    return notice;
  }

  decodeObject(o: any): DeviceNotice {
    return this.decode(o.type, o.payload);
  }
}
