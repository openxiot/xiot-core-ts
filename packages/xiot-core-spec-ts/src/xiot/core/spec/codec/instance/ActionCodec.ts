import {Spec} from '../../typedef/constant/Spec';
import {Action} from '../../typedef/instance/Action';
import {ActionType} from '../../typedef/definition/urn/ActionType';
import {DescriptionCodec} from '../definition/DescriptionCodec';
import {ArgumentCodec} from './ArgumentCodec';


export class ActionCodec {
  static decodeArray(array: any[]): Action[] {
    const list: Action[] = [];

    if (array != null) {
      for (const o of array) {
        list.push(ActionCodec.decode(o));
      }
    }

    return list;
  }

  static decode(o: any): Action {
    const iid = o[Spec.IID];
    const type = new ActionType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const argumentsIn = ArgumentCodec.decodeArray(o[Spec.IN]);
    const argumentsOut = ArgumentCodec.decodeArray(o[Spec.OUT]);
    return new Action(iid, type, description, argumentsIn, argumentsOut);
  }

  static encode(action: Action): any {
    const o: any = {
      iid: action.iid,
      type: action.type.toString(),
      description: DescriptionCodec.encode(action.description)
    };

    if (action.in.size > 0) {
      o[Spec.IN] = ArgumentCodec.encodeArray(action.getArgumentsIn());
    }

    if (action.out.size > 0) {
      o[Spec.OUT] = ArgumentCodec.encodeArray(action.getArgumentsOut());
    }

    return o;
  }

  static encodeArray(actions: Map<number, Action>): any[] {
    const array: any[] = [];

    actions.forEach(action => {
      array.push(ActionCodec.encode(action));
    });

    return array;
  }
}
