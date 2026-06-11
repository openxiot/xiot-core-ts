import {NoticeCodec} from '../../typedef/notice/NoticeCodec';
import {OwnerNotice} from '../../typedef/notice/owner/OwnerNotice';
import {OwnerNoticeType, OwnerNoticeTypeFromString} from '../../typedef/notice/owner/OwnerNoticeType';
import {OwnerDeviceAdded} from '../../typedef/notice/owner/impl/OwnerDeviceAdded';
import {OwnerDeviceAddedCodec} from './owner/OwnerDeviceAddedCodec';
import {OwnerDeviceRemoved} from '../../typedef/notice/owner/impl/OwnerDeviceRemoved';
import {OwnerDeviceRemovedCodec} from './owner/OwnerDeviceRemovedCodec';
import {OwnerDeviceSummaryChanged} from '../../typedef/notice/owner/impl/OwnerDeviceSummaryChanged';
import {OwnerDeviceSummaryChangedCodec} from './owner/OwnerDeviceSummaryChangedCodec';
import {OwnerPropertiesChanged} from '../../typedef/notice/owner/impl/OwnerPropertiesChanged';
import {OwnerPropertiesChangedCodec} from './owner/OwnerPropertiesChangedCodec';
import {OwnerEventOccurred} from '../../typedef/notice/owner/impl/OwnerEventOccurred';
import {OwnerEventOccurredCodec} from './owner/OwnerEventOccurredCodec';
import {OwnershipDisclaimed} from '../../typedef/notice/owner/impl/OwnershipDisclaimed';
import {OwnershipDisclaimedCodec} from './owner/OwnershipDisclaimedCodec';
import {OwnershipTaken} from '../../typedef/notice/owner/impl/OwnershipTaken';
import {OwnershipTakenCodec} from './owner/OwnershipTakenCodec';
import {OwnerRuleAdded} from '../../typedef/notice/owner/impl/OwnerRuleAdded';
import {OwnerRuleAddedCodec} from './owner/OwnerRuleAddedCodec';
import {OwnerRuleRemoved} from '../../typedef/notice/owner/impl/OwnerRuleRemoved';
import {OwnerRuleRemovedCodec} from './owner/OwnerRuleRemovedCodec';
import {OwnerRuleChanged} from '../../typedef/notice/owner/impl/OwnerRuleChanged';
import {OwnerRuleChangedCodec} from './owner/OwnerRuleChangedCodec';
import {OwnerRuleTriggered} from '../../typedef/notice/owner/impl/OwnerRuleTriggered';
import {OwnerRuleTriggeredCodec} from './owner/OwnerRuleTriggeredCodec';
import {OwnerRuleExecuted} from '../../typedef/notice/owner/impl/OwnerRuleExecuted';
import {OwnerRuleExecutedCodec} from './owner/OwnerRuleExecutedCodec';
import {OwnerSpaceAdded} from "../../typedef/notice/owner/impl/space/OwnerSpaceAdded";
import {OwnerSpaceAddedCodec} from "./owner/space/OwnerSpaceAddedCodec";
import {OwnerSpaceChangedCodec} from "./owner/space/OwnerSpaceChangedCodec";
import {OwnerSpaceChanged} from "../../typedef/notice/owner/impl/space/OwnerSpaceChanged";
import {OwnerSpaceRemoved} from "../../typedef/notice/owner/impl/space/OwnerSpaceRemoved";
import {OwnerSpaceRemovedCodec} from "./owner/space/OwnerSpaceRemovedCodec";
import {OwnerDeviceSomewhereChanged} from "../../typedef/notice/owner/impl/OwnerDeviceSomewhereChanged";
import {OwnerDeviceSomewhereChangedCodec} from "./owner/OwnerDeviceSomewhereChangedCodec";
import {OwnerHomeAdded} from "../../typedef/notice/owner/impl/home/OwnerHomeAdded";
import {OwnerHomeAddedCodec} from "./owner/home/OwnerHomeAddedCodec";
import {OwnerHomeChangedCodec} from "./owner/home/OwnerHomeChangedCodec";
import {OwnerHomeChanged} from "../../typedef/notice/owner/impl/home/OwnerHomeChanged";
import {OwnerHomeRemoved} from "../../typedef/notice/owner/impl/home/OwnerHomeRemoved";
import {OwnerHomeRemovedCodec} from "./owner/home/OwnerHomeRemovedCodec";
import {DeviceNotice} from "../../typedef/notice/device/DeviceNotice";

export class OwnerNoticeCodec extends NoticeCodec<OwnerNotice, any> {
  mainType(): string {
    return 'owner';
  }

  encode(x: OwnerNotice): any {
    let o: any = {};

    switch (OwnerNoticeTypeFromString(x.subType())) {
      case OwnerNoticeType.DEVICE_ADDED:
        if (x instanceof OwnerDeviceAdded) {
          o = OwnerDeviceAddedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.DEVICE_REMOVED:
        if (x instanceof OwnerDeviceRemoved) {
          o = OwnerDeviceRemovedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.DEVICE_SUMMARY_CHANGED:
        if (x instanceof OwnerDeviceSummaryChanged) {
          o = OwnerDeviceSummaryChangedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.DEVICE_SOMEWHERE_CHANGED:
        if (x instanceof OwnerDeviceSomewhereChanged) {
          o = OwnerDeviceSomewhereChangedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.DEVICE_PROPERTIES_CHANGED:
        if (x instanceof OwnerPropertiesChanged) {
          o = OwnerPropertiesChangedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.DEVICE_EVENT_OCCURRED:
        if (x instanceof OwnerEventOccurred) {
          o = OwnerEventOccurredCodec.encode(x);
        }
        break;

      case OwnerNoticeType.OWNERSHIP_DISCLAIMED:
        if (x instanceof OwnershipDisclaimed) {
          o = OwnershipDisclaimedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.OWNERSHIP_TAKEN:
        if (x instanceof OwnershipTaken) {
          o = OwnershipTakenCodec.encode(x);
        }
        break;

      case OwnerNoticeType.RULE_ADDED:
        if (x instanceof OwnerRuleAdded) {
          o = OwnerRuleAddedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.RULE_REMOVED:
        if (x instanceof OwnerRuleRemoved) {
          o = OwnerRuleRemovedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.RULE_CHANGED:
        if (x instanceof OwnerRuleChanged) {
          o = OwnerRuleChangedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.RULE_TRIGGERED:
        if (x instanceof OwnerRuleTriggered) {
          o = OwnerRuleTriggeredCodec.encode(x);
        }
        break;

      case OwnerNoticeType.RULE_EXECUTED:
        if (x instanceof OwnerRuleExecuted) {
          o = OwnerRuleExecutedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.HOME_ADDED:
        if (x instanceof OwnerHomeAdded) {
          o = OwnerHomeAddedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.HOME_CHANGED:
        if (x instanceof OwnerHomeChanged) {
          o = OwnerHomeChangedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.HOME_REMOVED:
        if (x instanceof OwnerHomeRemoved) {
          o = OwnerHomeRemovedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.SPACE_ADDED:
        if (x instanceof OwnerSpaceAdded) {
          o = OwnerSpaceAddedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.SPACE_CHANGED:
        if (x instanceof OwnerSpaceChanged) {
          o = OwnerSpaceChangedCodec.encode(x);
        }
        break;

      case OwnerNoticeType.SPACE_REMOVED:
        if (x instanceof OwnerSpaceRemoved) {
          o = OwnerSpaceRemovedCodec.encode(x);
        }
        break;

      default:
        break;
    }

    return o;
  }

  decode(subType: string, o: any): OwnerNotice {
    let notice: OwnerNotice;

    switch (subType) {
      case OwnerNoticeType.DEVICE_ADDED:
        notice = OwnerDeviceAddedCodec.decode(o);
        break;

      case OwnerNoticeType.DEVICE_REMOVED:
        notice = OwnerDeviceRemovedCodec.decode(o);
        break;

      case OwnerNoticeType.DEVICE_SUMMARY_CHANGED:
        notice = OwnerDeviceSummaryChangedCodec.decode(o);
        break;

      case OwnerNoticeType.DEVICE_SOMEWHERE_CHANGED:
        notice = OwnerDeviceSomewhereChangedCodec.decode(o);
        break;

      case OwnerNoticeType.DEVICE_PROPERTIES_CHANGED:
        notice = OwnerPropertiesChangedCodec.decode(o);
        break;

      case OwnerNoticeType.DEVICE_EVENT_OCCURRED:
        notice = OwnerEventOccurredCodec.decode(o);
        break;

      case OwnerNoticeType.OWNERSHIP_DISCLAIMED:
        notice = OwnershipDisclaimedCodec.decode(o);
        break;

      case OwnerNoticeType.OWNERSHIP_TAKEN:
        notice = OwnershipTakenCodec.decode(o);
        break;

      case OwnerNoticeType.RULE_ADDED:
        notice = OwnerRuleAddedCodec.decode(o);
        break;

      case OwnerNoticeType.RULE_REMOVED:
        notice = OwnerRuleRemovedCodec.decode(o);
        break;

      case OwnerNoticeType.RULE_CHANGED:
        notice = OwnerRuleChangedCodec.decode(o);
        break;

      case OwnerNoticeType.RULE_TRIGGERED:
        notice = OwnerRuleTriggeredCodec.decode(o);
        break;

      case OwnerNoticeType.RULE_EXECUTED:
        notice = OwnerRuleExecutedCodec.decode(o);
        break;

      case OwnerNoticeType.HOME_ADDED:
        notice = OwnerHomeAddedCodec.decode(o);
        break;

      case OwnerNoticeType.HOME_CHANGED:
        notice = OwnerHomeChangedCodec.decode(o);
        break;

      case OwnerNoticeType.HOME_REMOVED:
        notice = OwnerHomeRemovedCodec.decode(o);
        break;

      case OwnerNoticeType.SPACE_ADDED:
        notice = OwnerSpaceAddedCodec.decode(o);
        break;

      case OwnerNoticeType.SPACE_CHANGED:
        notice = OwnerSpaceChangedCodec.decode(o);
        break;

      case OwnerNoticeType.SPACE_REMOVED:
        notice = OwnerSpaceRemovedCodec.decode(o);
        break;

      default:
        throw new Error(`invalid subType: ${subType}`);
    }

    return notice;
  }

  decodeObject(o: any): OwnerNotice {
    return this.decode(o.type, o.payload);
  }
}
