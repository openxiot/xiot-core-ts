import {TemplateSummary} from '../../typedef/template/TemplateSummary';
import {DeviceType} from '../../typedef/definition/urn/DeviceType';
import {DescriptionCodec} from '../definition/DescriptionCodec';
import {Spec} from '../../typedef/constant/Spec';
import {LifeCycleFromString} from "../../typedef/lifecycle/Lifecycle";

export class TemplateSummaryCodec {
  static decode(o: any): TemplateSummary {
    const lifecycle = LifeCycleFromString(o.lifecycle || '');
    const type = new DeviceType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const template = new TemplateSummary(type, description);
    template.lifecycle = lifecycle;
    return template;
  }

  static encode(device: TemplateSummary): any {
    return {
      lifecycle: device.lifecycle.toString(),
      type: device.type.toString(),
      description: DescriptionCodec.encode(device.description)
    };
  }
}
