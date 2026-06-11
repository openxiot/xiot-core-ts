import { Device } from '@gkct/xiot-core-spec-ts';
import { IQQuery } from '../../IQQuery';
import { IQResult } from '../../IQResult';

export const GET_CHILDREN_METHOD = 'urn:xiot:get-children';

export class QueryGetChildren extends IQQuery {
  did = '';

  constructor(id: string, did: string) {
    super(id, GET_CHILDREN_METHOD);
    this.did = did;
  }

  public result(children: Device[]): ResultGetChildren {
    return new ResultGetChildren(this.id, children);
  }
}

export class ResultGetChildren extends IQResult {
  public children: Device[];

  constructor(id: string, children: Device[]) {
    super(id, GET_CHILDREN_METHOD);
    this.children = children;
  }
}
