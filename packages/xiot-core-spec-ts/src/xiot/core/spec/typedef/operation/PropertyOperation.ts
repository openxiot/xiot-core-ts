import {AbstractOperation} from './AbstractOperation';
import {PropertyID} from '../xid/PropertyID';
import {Status} from '../status/Status';
import {isString} from '../utils/StringUtils';

export class PropertyOperation extends AbstractOperation {

  pid: PropertyID = new PropertyID();
  value: any | null = null;
  argumentsCompact = false;

  static create(pid: string): PropertyOperation {
    const o = new PropertyOperation();
    o.pid = PropertyID.parse(pid);

    if (!o.pid.valid) {
      o.status = Status.PID_INVALID;
    }

    return o;
  }

  error(status: number, description: string): PropertyOperation {
    this.status = status;
    this.description = description;
    return this;
  }

  siid(): number {
    return this.pid.siid;
  }

  iid(): number {
    return this.pid.iid;
  }

  did(): string {
    return this.pid.did;
  }

  toString(pretty?: boolean, tab?: boolean): string {
    let str = '';

    if (tab) {
      str += '    ';
    }

    str += `${this.pid.toString()} => `;
    if (isString(this.value)) {
      str += `"${this.value}"`;
    } else {
      str += this.value.toString();
    }
    str += ';';

    return str;
  }
}
