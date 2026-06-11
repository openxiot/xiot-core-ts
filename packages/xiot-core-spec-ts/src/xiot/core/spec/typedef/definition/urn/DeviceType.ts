import { Urn } from './Urn';
import { UrnType } from './UrnType';

export class DeviceType extends Urn {
  constructor(string: string, exception = false) {
    super([UrnType.DEVICE], string, exception);
  }

  public static parse(string: string): DeviceType {
    return new DeviceType(string, true);
  }
}
