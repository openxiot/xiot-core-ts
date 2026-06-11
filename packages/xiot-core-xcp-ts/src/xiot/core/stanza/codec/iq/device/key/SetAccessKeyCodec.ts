import { IQCodec } from '../../../IQCodec';
import { IQQuery } from '../../../../typedef/iq/IQQuery';
import { IQResult } from '../../../../typedef/iq/IQResult';
import { QuerySetAccessKey, ResultSetAccessKey } from '../../../../typedef/iq/device/key/SetAccessKey';

export class SetAccessKeyCodec implements IQCodec {
  encodeQueryContent(query: IQQuery): any | null {
    if (query instanceof QuerySetAccessKey) {
      return {
        key: query.key
      };
    }

    return null;
  }

  encodeResultContent(query: IQResult): any | null {
    return null;
  }

  decodeQuery(id: string, content: any): IQQuery {
    return new QuerySetAccessKey(id, content.key);
  }

  decodeResult(id: string, content: any): IQResult {
    return new ResultSetAccessKey(id);
  }
}
