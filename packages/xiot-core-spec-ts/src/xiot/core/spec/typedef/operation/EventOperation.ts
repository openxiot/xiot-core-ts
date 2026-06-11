import {AbstractOperation} from './AbstractOperation';
import {EventID} from '../xid/EventID';
import {ArgumentOperation} from './ArgumentOperation';
import {Status} from '../status/Status';
import {IotError} from '../error/IotError';


export class EventOperation extends AbstractOperation {
  eid: EventID = new EventID();

  oid = '';

  readonly arguments: Map<number, ArgumentOperation> = new Map<number, ArgumentOperation>();
  argumentsCompact = false;

  getArgumentWithCheck(iid: number): ArgumentOperation {
    const arg = this.arguments.get(iid);
    if (arg === undefined || arg === null) {
      throw new IotError(Status.UNDEFINED, `argument not found for ${iid}`);
    }
    if (arg.values.length === 0) {
      throw new IotError(Status.UNDEFINED, `argument values is empty for ${iid}`);
    }
    return arg;
  }

  getArguments(): ArgumentOperation[] {
    return Array.from(this.arguments.values());
  }

  setArguments(list: ArgumentOperation[]) {
    list.forEach(x => {
      return this.arguments.set(x.piid, x);
    });
  }

  iid(): number {
    return this.eid.iid;
  }

  did(): string {
    return this.eid.did;
  }

  siid(): number {
    return this.eid.siid;
  }

  toString(pretty = false, tab = false): string {
    let str = '';
    if (tab) {
      str = '    ';
    }

    str += `${this.eid.toString()} =>`;

    if (!pretty) {
      str += ' ';
    }

    str += ArgumentOperation.toString(this.arguments, pretty, tab);
    str += ';';

    return str;
  }
}
