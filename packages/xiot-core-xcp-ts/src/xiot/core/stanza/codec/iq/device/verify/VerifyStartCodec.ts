import { IQCodec } from '../../../IQCodec';
import { IQQuery } from '../../../../typedef/iq/IQQuery';
import { IQResult } from '../../../../typedef/iq/IQResult';
import { QueryVerifyStart, ResultVerifyStart } from '../../../../typedef/iq/device/verify/VerifyStart';

export class VerifyStartCodec implements IQCodec {
  encodeQueryContent(query: IQQuery): any | null {
    if (query instanceof QueryVerifyStart) {
      return { 'public-key': query.publicKey };
    }

    return undefined;
  }

  encodeResultContent(result: IQResult): any | null {
    if (result instanceof ResultVerifyStart) {
      return {
        'public-key': result.publicKey,
        signature: result.signature
      };
    }

    return undefined;
  }

  decodeQuery(id: string, content: any): IQQuery {
    return new QueryVerifyStart(id, content['public-key']);
  }

  decodeResult(id: string, content: any): IQResult {
    return new ResultVerifyStart(id, content['public-key'], content.signature);
  }
}
