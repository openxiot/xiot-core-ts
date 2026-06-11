import { PropertyOperationCodec } from '@openxiot/xiot-core-spec-ts';
import { IQCodec } from '../../../IQCodec';
import { IQQuery } from '../../../../typedef/iq/IQQuery';
import { IQResult } from '../../../../typedef/iq/IQResult';
import { QuerySetProperty, ResultSetProperty } from '../../../../typedef/iq/device/control/SetProperty';

export class SetPropertyCodec implements IQCodec {
  encodeQueryContent(query: IQQuery): any | null {
    if (query instanceof QuerySetProperty) {
      return {
        property: PropertyOperationCodec.Set.QUERY.encodeObject(query.property)
      };
    }

    return null;
  }

  encodeResultContent(result: IQResult): any | null {
    if (result instanceof ResultSetProperty) {
      return {
        property: PropertyOperationCodec.Set.RESULT.encodeObject(result.property)
      };
    }

    return null;
  }

  decodeQuery(id: string, content: any): IQQuery {
    return new QuerySetProperty(id, PropertyOperationCodec.Set.QUERY.decodeObject(content.property));
  }

  decodeResult(id: string, content: any): IQResult {
    return new ResultSetProperty(id, PropertyOperationCodec.Set.RESULT.decodeObject(content.property));
  }
}
