import { ActionOperationCodec } from '@gkct/xiot-core-spec-ts';
import { IQCodec } from '../../../IQCodec';
import { IQQuery } from '../../../../typedef/iq/IQQuery';
import { IQResult } from '../../../../typedef/iq/IQResult';
import { QueryInvokeAction, ResultInvokeAction } from '../../../../typedef/iq/device/control/InvokeAction';

export class InvokeActionCodec implements IQCodec {
  encodeQueryContent(query: IQQuery): any | null {
    if (query instanceof QueryInvokeAction) {
      return {
        action: ActionOperationCodec.Query.encodeObject(query.action)
      };
    }

    return null;
  }

  encodeResultContent(result: IQResult): any | null {
    if (result instanceof ResultInvokeAction) {
      return {
        action: ActionOperationCodec.Result.encodeObject(result.action)
      };
    }

    return null;
  }

  decodeQuery(id: string, content: any): IQQuery {
    return new QueryInvokeAction(id, ActionOperationCodec.Query.decodeObject(content.action));
  }

  decodeResult(id: string, content: any): IQResult {
    return new ResultInvokeAction(id, ActionOperationCodec.Result.decodeObject(content.action));
  }
}
