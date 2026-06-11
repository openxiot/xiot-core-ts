import {DeviceTemplate} from '../../typedef/template/DeviceTemplate';
import {DeviceType} from '../../typedef/definition/urn/DeviceType';
import {DescriptionCodec} from '../definition/DescriptionCodec';
import {Spec} from '../../typedef/constant/Spec';
import {ServiceTemplateCodec} from './ServiceTemplateCodec';


export class DeviceTemplateCodec {
  static decode(o: any): DeviceTemplate {
    const type = new DeviceType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const services = ServiceTemplateCodec.decodeArray(o[Spec.SERVICES]);
    return new DeviceTemplate(type, description, services);
  }

  static encode(device: DeviceTemplate): any {
    return {
      type: device.type.toString(),
      description: DescriptionCodec.encode(device.description),
      services: ServiceTemplateCodec.encodeArray(device.services)
    };
  }
}
