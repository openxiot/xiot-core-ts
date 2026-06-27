import {TemplateSummary} from '../../typedef/template/TemplateSummary';
import {DeviceType} from '../../typedef/definition/urn/DeviceType';
import {DescriptionCodec} from '../definition/DescriptionCodec';
import {Spec} from '../../typedef/constant/Spec';
import {LifeCycle, LifeCycleFromString} from "../../typedef/lifecycle/Lifecycle";

export class TemplateSummaryCodec {

  static decodeArray(array: any[]): TemplateSummary[] {
    return array
        ? array.map(x => {
          return TemplateSummaryCodec.decode(x);
        })
        : [];
  }

  static decode(o: any): TemplateSummary {
    const lifecycle = LifeCycleFromString(o.lifecycle || '');
    const type = new DeviceType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const template = new TemplateSummary(type, description);
    template.lifecycle = lifecycle;
    return template;
  }

  static encode(device: TemplateSummary): any {
    const o: any = {
      type: device.type.toString(),
      description: DescriptionCodec.encode(device.description)
    };

    if (device.lifecycle !== LifeCycle.UNDEFINED) {
      o.lifecycle = device.lifecycle.toString();
    }

    return o;
  }
}
