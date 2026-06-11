import { PropertyOperationCodec } from '@openxiot/xiot-core-spec-ts';
import { IQCodec } from '../../../IQCodec';
import { IQQuery } from '../../../../typedef/iq/IQQuery';
import { IQResult } from '../../../../typedef/iq/IQResult';
import { QueryGetProperty, ResultGetProperty } from '../../../../typedef/iq/device/control/GetProperty';

export class GetPropertyCodec implements IQCodec {
  encodeQueryContent(query: IQQuery): any | null {
    if (query instanceof QueryGetProperty) {
      return {
        pid: PropertyOperationCodec.Get.QUERY.encodeObject(query.property)
      };
    }

    return null;
  }

  encodeResultContent(result: IQResult): any | null {
    if (result instanceof ResultGetProperty) {
      return {
        property: PropertyOperationCodec.Get.RESULT.encodeObject(result.property)
      };
    }

    return null;
  }

  decodeQuery(id: string, content: any): IQQuery {
    return new QueryGetProperty(id, PropertyOperationCodec.Get.QUERY.decodeObject(content.pid));
  }

  decodeResult(id: string, content: any): IQResult {
    return new ResultGetProperty(id, PropertyOperationCodec.Get.RESULT.decodeObject(content.property));
  }
}
