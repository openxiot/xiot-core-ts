import { IQQuery } from '../../IQQuery';
import { IQResult } from '../../IQResult';

export const REMOVE_CHILD_METHOD = 'urn:xiot:remove-child';

export class QueryRemoveChild extends IQQuery {
  did = '';

  childId = '';

  constructor(id: string, did: string, childId: string) {
    super(id, REMOVE_CHILD_METHOD);
    this.did = did;
    this.childId = childId;
  }

  public result(): ResultRemoveChild {
    return new ResultRemoveChild(this.id);
  }
}

export class ResultRemoveChild extends IQResult {
  constructor(id: string) {
    super(id, REMOVE_CHILD_METHOD);
  }
}
