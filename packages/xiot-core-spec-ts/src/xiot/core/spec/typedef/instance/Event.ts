import { EventType } from '../definition/urn/EventType';
import { Argument } from './Argument';

export class Event {
  iid = 0;

  type: EventType;

  description: Map<string, string> = new Map<string, string>();

  arguments: Map<number, Argument> = new Map<number, Argument>();

  constructor(iid: number, type: EventType, description: Map<string, string>, list: Argument[]) {
    this.iid = iid;
    this.type = type;
    this.description = description;
    list.forEach(x => {
      return this.arguments.set(x.piid, x);
    });
  }

  getArguments(): Argument[] {
    return Array.from(this.arguments.values());
  }

  addArgument(arg: Argument): void {
    this.arguments.set(arg.piid, arg);
  }
}
