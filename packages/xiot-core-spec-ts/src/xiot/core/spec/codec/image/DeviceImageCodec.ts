import {Spec} from '../../typedef/constant/Spec';
import {DeviceImage} from '../../typedef/image/DeviceImage';
import {DeviceType} from '../../typedef/definition/urn/DeviceType';
import {DescriptionCodec} from '../definition/DescriptionCodec';
import {ServiceImageCodec} from './ServiceImageCodec';

export class DeviceImageCodec {
  static decode(did: string, o: any): DeviceImage {
    const type = new DeviceType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const services = ServiceImageCodec.decodeArray(o[Spec.SERVICES]);
    return new DeviceImage(did, type, description, services);
  }
}
