import { ActionOperation } from '@openxiot/xiot-core-spec-ts';
import { IQQuery } from '../../IQQuery';
import { IQResult } from '../../IQResult';

export const INVOKE_ACTION_METHOD = 'urn:xiot:invoke-action';

export class QueryInvokeAction extends IQQuery {
  public action: ActionOperation;

  constructor(id: string, o: ActionOperation) {
    super(id, INVOKE_ACTION_METHOD);
    this.action = o;
  }

  public result(action: ActionOperation): ResultInvokeAction {
    return new ResultInvokeAction(this.id, action);
  }
}

export class ResultInvokeAction extends IQResult {
  public action: ActionOperation;

  constructor(id: string, action: ActionOperation) {
    super(id, INVOKE_ACTION_METHOD);
    this.action = action;
  }
}
