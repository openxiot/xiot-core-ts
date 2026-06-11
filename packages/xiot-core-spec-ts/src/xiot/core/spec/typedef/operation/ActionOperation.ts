import {AbstractOperation} from './AbstractOperation';
import {ActionID} from '../xid/ActionID';
import {ArgumentOperation} from './ArgumentOperation';


export class ActionOperation extends AbstractOperation {

  aid: ActionID = new ActionID();
  oid: string = '';
  in: Map<number, ArgumentOperation>  = new Map<number, ArgumentOperation>();
  out: Map<number, ArgumentOperation>  = new Map<number, ArgumentOperation>();
  argumentsCompact = false;

  constructor() {
    super();
  }

  error(status: number, description: string): ActionOperation {
    this.status = status;
    this.description = description;
    return this;
  }

  public getArgumentsIn(): ArgumentOperation[] {
    return Array.from(this.in.values());
  }

  public getArgumentsOut(): ArgumentOperation[] {
    return Array.from(this.out.values());
  }

  setArgumentsIn(list: ArgumentOperation[]) {
    list.forEach(x => {
      return this.in.set(x.piid, x);
    });
  }

  setArgumentsOut(list: ArgumentOperation[]) {
    list.forEach(x => {
      return this.out.set(x.piid, x);
    });
  }

  toString(pretty = true, tab = false): string {
    let str = '';

    if (tab) {
      str += '    ';
    }

    str += `${this.aid.toString()} =>`;

    if (!pretty) {
      str += ' ';
    }

    str += `${ArgumentOperation.toString(this.in, pretty, tab)};`;

    return str;
  }
}
