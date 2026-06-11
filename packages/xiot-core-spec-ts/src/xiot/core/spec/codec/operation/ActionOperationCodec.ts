import {ActionOperation} from '../../typedef/operation/ActionOperation';
import {AbstractOperationCodec} from './AbstractOperationCodec';
import {ActionID} from '../../typedef/xid/ActionID';
import {Spec} from '../../typedef/constant/Spec';
import {ArgumentOperationCodec} from './ArgumentOperationCodec';


export class ActionOperationCodecQuery extends AbstractOperationCodec<ActionOperation, any> {
  decodeObject(o: any): ActionOperation {
    const action = new ActionOperation();
    action.aid = ActionID.parse(o[Spec.AID]);

    if (o[Spec.IN] != null) {
      if (o[Spec.IN] instanceof Array) {
        action.setArgumentsIn(ArgumentOperationCodec.decodeArray(o[Spec.IN]));
      } else {
        action.argumentsCompact = true;
        action.setArgumentsIn(ArgumentOperationCodec.decodeObjet(o[Spec.IN]));
      }
    }

    return action;
  }

  encodeObject(action: ActionOperation): any {
    const object: any = {
      aid: action.aid.toString()
    };

    if (action.oid !== '') {
      object[Spec.OID] = action.oid;
    }

    if (action.in.size > 0) {
      object[Spec.IN] = ArgumentOperationCodec.encodeArray(action.argumentsCompact, action.getArgumentsIn());
    }

    return object;
  }
}

export class ActionOperationCodecResult extends AbstractOperationCodec<ActionOperation, any> {
  decodeObject(o: any): ActionOperation {
    const action = new ActionOperation();
    action.aid = ActionID.parse(o[Spec.AID]);
    action.oid = o[Spec.OID] || '';
    action.status = o[Spec.STATUS];
    if (action.status === 0) {

      if (o[Spec.OUT] != null) {
        if (o[Spec.OUT] instanceof Array) {
          action.setArgumentsOut(ArgumentOperationCodec.decodeArray(o[Spec.OUT]));
        } else {
          action.argumentsCompact = true;
          action.setArgumentsOut(ArgumentOperationCodec.decodeObjet(o[Spec.OUT]));
        }
      }
    } else {
      action.description = o[Spec.DESCRIPTION];
    }

    return action;
  }

  encodeObject(action: ActionOperation): any {
    const object: any = {
      aid: action.aid.toString(),
      status: action.status
    };

    if (action.oid !== '') {
      object[Spec.OID] = action.oid;
    }

    if (action.status === 0) {
      if (action.out.size > 0) {
        object[Spec.OUT] = ArgumentOperationCodec.encodeArray(action.argumentsCompact, action.getArgumentsOut());
      }
    } else {
      object[Spec.DESCRIPTION] = action.description;
    }

    return object;
  }
}

export class ActionOperationCodec {
  public static Query: ActionOperationCodecQuery = new ActionOperationCodecQuery();

  public static Result: ActionOperationCodecResult = new ActionOperationCodecResult();
}
