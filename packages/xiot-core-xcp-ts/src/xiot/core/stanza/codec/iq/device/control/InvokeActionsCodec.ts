import { ActionOperationCodec } from '@openxiot/xiot-core-spec-ts';
import { IQCodec } from '../../../IQCodec';
import { IQQuery } from '../../../../typedef/iq/IQQuery';
import { IQResult } from '../../../../typedef/iq/IQResult';
import { QueryInvokeActions, ResultInvokeActions } from '../../../../typedef/iq/device/control/InvokeActions';

export class InvokeActionsCodec implements IQCodec {
  encodeQueryContent(query: IQQuery): any | null {
    if (query instanceof QueryInvokeActions) {
      return {
        actions: ActionOperationCodec.Query.encodeArray(query.actions)
      };
    }

    return null;
  }

  encodeResultContent(result: IQResult): any | null {
    if (result instanceof ResultInvokeActions) {
      return {
        actions: ActionOperationCodec.Result.encodeArray(result.actions)
      };
    }

    return null;
  }

  decodeQuery(id: string, content: any): IQQuery {
    return new QueryInvokeActions(id, ActionOperationCodec.Query.decodeArray(content.actions));
  }

  decodeResult(id: string, content: any): IQResult {
    return new ResultInvokeActions(id, ActionOperationCodec.Result.decodeArray(content.actions));
  }
}
