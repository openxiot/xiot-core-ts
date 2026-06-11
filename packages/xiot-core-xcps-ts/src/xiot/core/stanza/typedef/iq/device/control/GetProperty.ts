import { PropertyOperation } from '@openxiot/xiot-core-spec-ts';
import { IQQuery } from '../../IQQuery';
import { IQResult } from '../../IQResult';

export const GET_PROPERTY_METHOD = 'urn:xiot:get-property';

export class QueryGetProperty extends IQQuery {
  public property: PropertyOperation;

  constructor(id: string, property: PropertyOperation) {
    super(id, GET_PROPERTY_METHOD);
    this.property = property;
  }

  public result(property: PropertyOperation): ResultGetProperty {
    return new ResultGetProperty(this.id, property);
  }
}

export class ResultGetProperty extends IQResult {
  public property: PropertyOperation;

  constructor(id: string, property: PropertyOperation) {
    super(id, GET_PROPERTY_METHOD);
    this.property = property;
  }
}
