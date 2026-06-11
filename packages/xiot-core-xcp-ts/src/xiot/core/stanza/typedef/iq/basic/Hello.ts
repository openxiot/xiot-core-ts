import { IQQuery } from '../IQQuery';
import { IQResult } from '../IQResult';

export const HELLO_METHOD = 'urn:xiot:hello';

export class QueryHello extends IQQuery {
  constructor(id: string) {
    super(id, HELLO_METHOD);
  }

  public result(): ResultHello {
    return new ResultHello(this.id);
  }
}

export class ResultHello extends IQResult {
  constructor(id: string) {
    super(id, HELLO_METHOD);
  }
}
