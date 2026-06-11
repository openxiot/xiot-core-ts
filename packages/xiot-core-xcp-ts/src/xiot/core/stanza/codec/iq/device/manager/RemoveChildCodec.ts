import { IQCodec } from '../../../IQCodec';
import { IQQuery } from '../../../../typedef/iq/IQQuery';
import { IQResult } from '../../../../typedef/iq/IQResult';
import { QueryRemoveChild, ResultRemoveChild } from '../../../../typedef/iq/device/manager/RemoveChild';

export class RemoveChildCodec implements IQCodec {
  encodeQueryContent(query: IQQuery): any | null {
    if (query instanceof QueryRemoveChild) {
      return {
        did: query.did,
        child: query.childId
      };
    }
  }

  encodeResultContent(result: IQResult): null {
    return null;
  }

  decodeQuery(id: string, content: any): IQQuery {
    return new QueryRemoveChild(id, content.did || '', content.child || '');
  }

  decodeResult(id: string): IQResult {
    return new ResultRemoveChild(id);
  }
}
