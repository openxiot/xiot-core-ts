import { DeviceCodec } from '@gkct/xiot-core-spec-ts';
import { IQCodec } from '../../../IQCodec';
import { IQQuery } from '../../../../typedef/iq/IQQuery';
import { IQResult } from '../../../../typedef/iq/IQResult';
import { QueryGetChildren, ResultGetChildren } from '../../../../typedef/iq/device/control/GetChildren';

export class GetChildrenCodec implements IQCodec {
  encodeQueryContent(query: IQQuery): any | null {
    if (query instanceof QueryGetChildren) {
      return {
        did: query.did
      };
    }
  }

  encodeResultContent(result: IQResult): any | null {
    if (result instanceof ResultGetChildren) {
      return { children: DeviceCodec.encodeArray(result.children) };
    }

    return null;
  }

  decodeQuery(id: string, content: any): IQQuery {
    return new QueryGetChildren(id, content.did);
  }

  decodeResult(id: string, content: any): IQResult {
    return new ResultGetChildren(id, DeviceCodec.decodeArray(content.children));
  }
}
