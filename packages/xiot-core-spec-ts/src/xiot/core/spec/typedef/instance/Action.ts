import { ActionType } from '../definition/urn/ActionType';
import { Argument } from './Argument';

export class Action {
  iid = 0;

  type: ActionType;

  description: Map<string, string> = new Map<string, string>();

  in: Map<number, Argument> = new Map<number, Argument>();

  out: Map<number, Argument> = new Map<number, Argument>();

  constructor(
    iid: number,
    type: ActionType,
    description: Map<string, string>,
    argumentsIn: Argument[],
    argumentsOut: Argument[]
  ) {
    this.iid = iid;
    this.type = type;
    this.description = description;
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

  addArgumentIn(arg: Argument): void {
    this.in.set(arg.piid, arg);
  }

  addArgumentOut(arg: Argument): void {
    this.out.set(arg.piid, arg);
  }
}
