import { IQCodec } from '../../../IQCodec';
import { IQQuery } from '../../../../typedef/iq/IQQuery';
import { IQResult } from '../../../../typedef/iq/IQResult';
import { QueryInitialize, ResultInitialize } from '../../../../typedef/iq/device/verify/Initialize';

export class InitializeCodec implements IQCodec {
  encodeQueryContent(query: IQQuery): any | null {
    if (query instanceof QueryInitialize) {
      return {
        version: query.version,
        authentication: query.authentication
      };
    }

    return null;
  }

  encodeResultContent(query: IQResult): any | null {
    return null;
  }

  decodeQuery(id: string, content: any): IQQuery {
    if (content == null) {
      throw new Error('content is null');
    }

    const { version } = content;
    const { authentication } = content;
    return new QueryInitialize(id, version, authentication);
  }

  decodeResult(id: string, content: any): IQResult {
    return new ResultInitialize(id);
  }
}
