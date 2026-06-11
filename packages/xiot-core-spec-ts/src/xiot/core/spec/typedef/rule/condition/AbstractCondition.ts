import {PropertyID} from '../../xid/PropertyID';
import {EventOperation} from '../../operation/EventOperation';

export abstract class AbstractCondition {

  getPropertyIDList(): Array<PropertyID> {
    return [];
  }
  getExternalIDList(): Array<string> {
    return [];
  }

  abstract check(externalValues: Map<string, Object>, propertyValues: Map<PropertyID, Object>, event: EventOperation): boolean;

}
