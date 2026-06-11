import { Urn } from './Urn';
import { UrnType } from './UrnType';

export class PropertyType extends Urn {
  constructor(string: string, exception = false) {
    super([UrnType.PROPERTY], string, exception);
  }

  public static parse(string: string): PropertyType {
    return new PropertyType(string, true);
  }
}
