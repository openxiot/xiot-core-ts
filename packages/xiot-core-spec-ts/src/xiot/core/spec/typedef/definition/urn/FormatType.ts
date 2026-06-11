import { Urn } from './Urn';
import { UrnType } from './UrnType';

export class FormatType extends Urn {
  constructor(string: string, exception = false) {
    super([UrnType.FORMAT], string, exception);
  }

  public static parse(string: string): FormatType {
    return new FormatType(string, true);
  }
}
