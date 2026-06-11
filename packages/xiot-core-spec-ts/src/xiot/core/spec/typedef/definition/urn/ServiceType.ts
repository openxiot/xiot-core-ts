import { Urn } from './Urn';
import { UrnType } from './UrnType';

export class ServiceType extends Urn {
  constructor(string: string, exception = false) {
    super([UrnType.SERVICE], string, exception);
  }

  public static parse(string: string): ServiceType {
    return new ServiceType(string, true);
  }
}
