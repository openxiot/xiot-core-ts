import {Spec} from '../../typedef/constant/Spec';
import {DeviceInstance} from '../../typedef/instance/DeviceInstance';
import {DescriptionCodec} from '../definition/DescriptionCodec';
import {ServiceCodec} from './ServiceCodec';
import {UrnType} from "../../typedef/definition/urn/UrnType";
import {Urn} from "../../typedef/definition/urn/Urn";

export class DeviceInstanceCodec {
  static decode(o: any): DeviceInstance {
    const type = new Urn([UrnType.DEVICE, UrnType.GROUP], o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const services = ServiceCodec.decodeArray(o[Spec.SERVICES]);
    return new DeviceInstance(type, description, services);
  }

  static encode(device: DeviceInstance): any {
    return {
      type: device.type.toString(),
      description: DescriptionCodec.encode(device.description),
      services: ServiceCodec.encodeArray(device.services)
    };
  }
}
