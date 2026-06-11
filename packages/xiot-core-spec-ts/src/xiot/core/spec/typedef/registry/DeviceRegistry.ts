import {Device} from '../device/Device';
import {AccessPoint} from './accesspoint/AccessPoint';

export class DeviceRegistry extends Device {

  accessKey!: string;
  accessPoint!: AccessPoint;
}
