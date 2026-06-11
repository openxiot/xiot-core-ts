import {ActionType} from '../definition/urn/ActionType';
import {Argument} from '../instance/Argument';

/**
 * ouyang
 */
export class ActionTemplate {
  iid: number;

  required: boolean;

  type: ActionType;

  description: Map<string, string> = new Map<string, string>();

  in: Map<number, Argument> = new Map<number, Argument>();

  out: Map<number, Argument> = new Map<number, Argument>();

  source: string;

  constructor(
    iid: number,
    required: boolean,
    type: ActionType,
    description: Map<string, string>,
    argumentsIn: Argument[],
    argumentsOut: Argument[],
    source: string
  ) {
    this.iid = iid;
    this.required = required;
    this.source = source;
    this.type = type;

    if (description != null) {
      this.description = description;
    }

    argumentsIn.forEach(x => {
      return this.in.set(x.piid, x);
    });
    argumentsOut.forEach(x => {
      return this.out.set(x.piid, x);
    });
  }

  getArgumentsIn(): Argument[] {
    return Array.from(this.in.values());
  }

  getArgumentsOut(): Argument[] {
    return Array.from(this.out.values());
  }
}
