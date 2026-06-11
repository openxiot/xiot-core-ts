import {Spec} from '../../typedef/constant/Spec';
import {AbstractOperationCodec} from './AbstractOperationCodec';
import {EventOperation} from '../../typedef/operation/EventOperation';
import {EventID} from '../../typedef/xid/EventID';
import {ArgumentOperationCodec} from './ArgumentOperationCodec';


export class EventOperationCodecQuery extends AbstractOperationCodec<EventOperation, any> {
  decodeObject(o: any): EventOperation {
    const event = new EventOperation();
    event.eid = EventID.parse(o[Spec.EID]);
    event.oid = o[Spec.OID] || '';

    if (o[Spec.ARGUMENTS] != null) {
      if (o[Spec.ARGUMENTS] instanceof Array) {
        event.setArguments(ArgumentOperationCodec.decodeArray(o[Spec.ARGUMENTS]));
      } else {
        event.argumentsCompact = true;
        event.setArguments(ArgumentOperationCodec.decodeObjet(o[Spec.ARGUMENTS]));
      }
    }

    return event;
  }

  encodeObject(event: EventOperation): any {
    const object: any = {
      eid: event.eid.toString(),
      oid: event.oid
    };

    if (event.getArguments().length > 0) {
      object[Spec.ARGUMENTS] = ArgumentOperationCodec.encodeArray(event.argumentsCompact, event.getArguments());
    }

    return object;
  }
}

export class EventOperationCodecResult extends AbstractOperationCodec<EventOperation, any> {
  decodeObject(o: any): EventOperation {
    const event = new EventOperation();
    event.eid = EventID.parse(o[Spec.EID]);
    event.status = o[Spec.STATUS];
    if (event.status !== 0) {
      event.description = o[Spec.DESCRIPTION];
    }
    return event;
  }

  encodeObject(event: EventOperation): any {
    const object: any = {
      eid: event.eid.toString(),
      status: event.status
    };
    if (event.status !== 0) {
      object.description = event.description;
    }
    return object;
  }
}
export class EventOperationCodec {
  public static Query: EventOperationCodecQuery = new EventOperationCodecQuery();

  public static Result: EventOperationCodecResult = new EventOperationCodecResult();
}
