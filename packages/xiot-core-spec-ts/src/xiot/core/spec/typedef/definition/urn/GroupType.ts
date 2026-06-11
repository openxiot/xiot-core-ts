import { Urn } from './Urn';
import { UrnType } from './UrnType';

export class GroupType extends Urn {
  constructor(string: string, exception = false) {
    super([UrnType.GROUP], string, exception);
  }

  public static parse(string: string): GroupType {
    return new GroupType(string, true);
  }
}
