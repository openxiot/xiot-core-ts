import { PropertyOperation } from '@gkct/xiot-core-spec-ts';
import { IQQuery } from '../../IQQuery';
import { IQResult } from '../../IQResult';

export const SET_PROPERTY_METHOD = 'urn:xiot:set-property';

export class QuerySetProperty extends IQQuery {
  public property: PropertyOperation;

  constructor(id: string, property: PropertyOperation) {
    super(id, SET_PROPERTY_METHOD);
    this.property = property;
  }

  public result(property: PropertyOperation): ResultSetProperty {
    return new ResultSetProperty(this.id, property);
  }
}

export class ResultSetProperty extends IQResult {
  public property: PropertyOperation;

  constructor(id: string, property: PropertyOperation) {
    super(id, SET_PROPERTY_METHOD);
    this.property = property;
  }
}
