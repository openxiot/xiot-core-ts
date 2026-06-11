import { Urn } from './Urn';
import { UrnType } from './UrnType';

export class UnitType extends Urn {
  constructor(string: string, exception = false) {
    super([UrnType.UNIT], string, exception);
  }

  public static parse(string: string): UnitType {
    return new UnitType(string, true);
  }
}
