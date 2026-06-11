import { Urn } from './Urn';
import { UrnType } from './UrnType';

export class EventType extends Urn {
  constructor(string: string, exception = false) {
    super([UrnType.EVENT], string, exception);
  }

  public static parse(string: string): EventType {
    return new EventType(string, true);
  }
}
