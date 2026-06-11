import { IQCodec } from '../../IQCodec';
import { IQQuery } from '../../../typedef/iq/IQQuery';
import { IQResult } from '../../../typedef/iq/IQResult';
import { QueryHello, ResultHello } from '../../../typedef/iq/basic/Hello';

export class HelloCodec implements IQCodec {
  encodeQueryContent(query: IQQuery): any | null {
    return null;
  }

  encodeResultContent(result: IQResult): any | null {
    return null;
  }

  decodeQuery(id: string, content: Object): IQQuery {
    return new QueryHello(id);
  }

  decodeResult(id: string, content: Object): IQResult {
    return new ResultHello(id);
  }
}
