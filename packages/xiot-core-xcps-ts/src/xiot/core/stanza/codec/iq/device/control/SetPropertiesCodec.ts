import { PropertyOperationCodec } from '@openxiot/xiot-core-spec-ts';
import { IQCodec } from '../../../IQCodec';
import { IQQuery } from '../../../../typedef/iq/IQQuery';
import { IQResult } from '../../../../typedef/iq/IQResult';
import { QuerySetProperties, ResultSetProperties } from '../../../../typedef/iq/device/control/SetProperties';

export class SetPropertiesCodec implements IQCodec {
  encodeQueryContent(query: IQQuery): any | null {
    if (query instanceof QuerySetProperties) {
      return {
        properties: PropertyOperationCodec.Set.QUERY.encodeArray(query.properties)
      };
    }

    return null;
  }

  encodeResultContent(result: IQResult): any | null {
    if (result instanceof ResultSetProperties) {
      return {
        properties: PropertyOperationCodec.Set.RESULT.encodeArray(result.properties)
      };
    }

    return null;
  }

  decodeQuery(id: string, content: any): IQQuery {
    return new QuerySetProperties(id, PropertyOperationCodec.Set.QUERY.decodeArray(content.properties));
  }

  decodeResult(id: string, content: any): IQResult {
    return new ResultSetProperties(id, PropertyOperationCodec.Set.RESULT.decodeArray(content.properties));
  }
}
