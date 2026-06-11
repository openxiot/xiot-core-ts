import {AbstractCondition} from './AbstractCondition';
import {EventID} from '../../xid/EventID';
import {ArgumentOperation} from '../../operation/ArgumentOperation';
import {PropertyID} from '../../xid/PropertyID';
import {EventOperation} from '../../operation/EventOperation';


export class EventCondition extends AbstractCondition {

  private _eid: EventID;
  private _arguments: Map<Number, ArgumentOperation> = new Map<Number, ArgumentOperation>();

  constructor(eid: EventID) {
    super();
    this._eid = eid;
  }


  get eid(): EventID {
    return this._eid;
  }

  set eid(value: EventID) {
    this._eid = value;
  }

  get arguments(): Map<Number, ArgumentOperation> {
    return this._arguments;
  }

  set arguments(value: Map<Number, ArgumentOperation>) {
    this._arguments = value;
  }

  check(externalValues: Map<String, Object>, propertyValues: Map<PropertyID, Object>, event: EventOperation): boolean {
    if (this._eid.toString() !== event.eid.toString()) {
      return false;
    }

    if (arguments.length > 0) {
      for (const argument of this._arguments.values()) {
        const o = event.arguments.get(argument.piid);
        if (o === null || o === undefined) {
          return false;
        }

        if (o.values.length !== argument.values.length) {
          return false;
        }

        for (let i = 0; i < o.values.length; i++) {
          if (o.values[i] !== argument.values[i]) {
            return false;
          }
        }
      }
    }

    return true;
  }

  toString(): string {
    let str = this.eid + ' == {';

    let i = 1;
    const size = this.arguments.size;

    this.arguments.forEach((argument ) => {
      str += argument.toString();

      if (i < size) {
        str += ', ';
      }

      i++;
    });

    return str + '}';
  }

}
