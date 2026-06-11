import { PropertyOperation } from '@gkct/xiot-core-spec-ts';
import { IQQuery } from '../../IQQuery';
import { IQResult } from '../../IQResult';

export const GET_PROPERTIES_METHOD = 'urn:xiot:get-properties';

export class QueryGetProperties extends IQQuery {
  public properties: Array<PropertyOperation>;

  constructor(id: string, properties: Array<PropertyOperation>) {
    super(id, GET_PROPERTIES_METHOD);
    this.properties = properties;
  }

  public result(properties: Array<PropertyOperation>): ResultGetProperties {
    return new ResultGetProperties(this.id, properties);
  }
}

export class ResultGetProperties extends IQResult {
  public properties: Array<PropertyOperation>;

  constructor(id: string, properties: Array<PropertyOperation>) {
    super(id, GET_PROPERTIES_METHOD);
    this.properties = properties;
  }
}
