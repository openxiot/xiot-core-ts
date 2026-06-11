import { Urn } from './Urn';
import { UrnType } from './UrnType';

export class ActionType extends Urn {
  constructor(string: string, exception = false) {
    super([UrnType.ACTION], string, exception);
  }

  public static parse(string: string): ActionType {
    return new ActionType(string, true);
  }
}
