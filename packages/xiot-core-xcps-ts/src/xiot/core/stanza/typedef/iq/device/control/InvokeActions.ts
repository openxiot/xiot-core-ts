import { ActionOperation } from '@openxiot/xiot-core-spec-ts';
import { IQQuery } from '../../IQQuery';
import { IQResult } from '../../IQResult';

export const INVOKE_ACTIONS_METHOD = 'urn:xiot:invoke-actions';

export class QueryInvokeActions extends IQQuery {
  public actions: Array<ActionOperation>;

  constructor(id: string, actions: Array<ActionOperation>) {
    super(id, INVOKE_ACTIONS_METHOD);
    this.actions = actions;
  }

  public result(actions: Array<ActionOperation>): ResultInvokeActions {
    return new ResultInvokeActions(this.id, actions);
  }
}

export class ResultInvokeActions extends IQResult {
  public actions: Array<ActionOperation>;

  constructor(id: string, actions: Array<ActionOperation>) {
    super(id, INVOKE_ACTIONS_METHOD);
    this.actions = actions;
  }
}
