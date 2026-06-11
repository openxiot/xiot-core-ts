import {EventType} from '../definition/urn/EventType';
import {Argument} from '../instance/Argument';

/**
 * ouyang
 */
export class EventTemplate {
  iid: number;

  required: boolean;

  type: EventType;

  description: Map<string, string> = new Map<string, string>();

  arguments: Map<number, Argument> = new Map<number, Argument>();

  source: string;

  constructor(
    iid: number,
    required: boolean,
    type: EventType,
    description: Map<string, string>,
    list: Argument[],
    source: string
  ) {
    this.iid = iid;
    this.required = required;
    this.source = source;
    this.type = type;

    if (description != null) {
      this.description = description;
    }

    list.forEach(x => {
      return this.arguments.set(x.piid, x);
    });
  }

  getArguments(): Argument[] {
    return Array.from(this.arguments.values());
  }
}
