import {Spec} from '../../typedef/constant/Spec';
import {DeviceInstance} from '../../typedef/instance/DeviceInstance';
import {DescriptionCodec} from '../definition/DescriptionCodec';
import {ServiceCodec} from './ServiceCodec';
import {UrnType} from "../../typedef/definition/urn/UrnType";
import {Urn} from "../../typedef/definition/urn/Urn";
import {LifeCycle, LifeCycleFromString} from "../../typedef/lifecycle/Lifecycle";

export class DeviceInstanceCodec {
  static decode(o: any): DeviceInstance {
    const lifecycle = LifeCycleFromString(o[Spec.LIFECYCLE]);
    const type = new Urn([UrnType.DEVICE, UrnType.GROUP], o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const services = ServiceCodec.decodeArray(o[Spec.SERVICES]);
    const instance = new DeviceInstance(type, description, services);
    instance.lifecycle = lifecycle;
    return instance;
  }

  static encode(device: DeviceInstance): any {
    const o: any = {
      type: device.type.toString(),
      description: DescriptionCodec.encode(device.description),
      services: ServiceCodec.encodeArray(device.services)
    };

    if (device.lifecycle !== LifeCycle.UNDEFINED) {
      o.lifecycle = device.lifecycle.toString();
    }

    return o;
  }
}
