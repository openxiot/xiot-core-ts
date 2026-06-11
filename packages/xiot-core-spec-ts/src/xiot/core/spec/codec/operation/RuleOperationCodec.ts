import {Spec} from '../../typedef/constant/Spec';
import {AbstractOperationCodec} from './AbstractOperationCodec';
import {RuleOperation} from '../../typedef/operation/RuleOperation';


export class RuleOperationCodecQuery extends AbstractOperationCodec<RuleOperation, String> {
  decodeObject(o: any): RuleOperation {
    return new RuleOperation(o);
  }

  encodeObject(o: RuleOperation): any {
    if (o.status < 0) {
      return null;
    }

    return o.ruleId;
  }
}

export class RuleOperationCodecResult extends AbstractOperationCodec<RuleOperation, any> {
  decodeObject(o: any): RuleOperation {
    const operation = new RuleOperation(o.ruleId);

    if (o.status < 0) {
      operation.description = o[Spec.DESCRIPTION];
    }

    return operation;
  }

  encodeObject(operation: RuleOperation): any {
    const object: any = {
      ruleId: operation.ruleId,
      status: operation.status
    };

    if (operation.status < 0) {
      object[Spec.DESCRIPTION] = operation.description;
    }

    return object;
  }
}

export class RuleOperationCodec {
  public static Query: RuleOperationCodecQuery = new RuleOperationCodecQuery();

  public static Result: RuleOperationCodecResult = new RuleOperationCodecResult();
}
