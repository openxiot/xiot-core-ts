import { PropertyOperationCodec } from '@gkct/xiot-core-spec-ts';
import { IQCodec } from '../../../IQCodec';
import { IQQuery } from '../../../../typedef/iq/IQQuery';
import { IQResult } from '../../../../typedef/iq/IQResult';
import { QueryGetProperties, ResultGetProperties } from '../../../../typedef/iq/device/control/GetProperties';

export class GetPropertiesCodec implements IQCodec {
  encodeQueryContent(query: IQQuery): any | null {
    if (query instanceof QueryGetProperties) {
      return {
        properties: PropertyOperationCodec.Get.QUERY.encodeArray(query.properties)
      };
    }

    return null;
  }

  encodeResultContent(result: IQResult): any | null {
    if (result instanceof ResultGetProperties) {
      return {
        properties: PropertyOperationCodec.Get.RESULT.encodeArray(result.properties)
      };
    }

    return null;
  }

  decodeQuery(id: string, content: any): IQQuery {
    return new QueryGetProperties(id, PropertyOperationCodec.Get.QUERY.decodeArray(content.properties));
  }

  decodeResult(id: string, content: any): IQResult {
    return new ResultGetProperties(id, PropertyOperationCodec.Get.RESULT.decodeArray(content.properties));
  }
}
