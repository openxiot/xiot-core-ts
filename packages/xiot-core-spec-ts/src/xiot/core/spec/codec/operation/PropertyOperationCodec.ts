import {Spec} from '../../typedef/constant/Spec';
import {AbstractOperationCodec} from './AbstractOperationCodec';
import {PropertyOperation} from '../../typedef/operation/PropertyOperation';
import {PropertyID} from '../../typedef/xid/PropertyID';
import {CombinationValueCodec} from './CombinationValueCodec';


export class PropertyOperationCodecGetQuery extends AbstractOperationCodec<PropertyOperation, string> {
  decodeObject(o: any): PropertyOperation {
    if (typeof o === 'string') {
      const property = new PropertyOperation();
      property.pid = PropertyID.parse(o);
      return property;
    }

    throw Error(`invalid pid: ${o}`);
  }

  encodeObject(t: PropertyOperation): string {
    return t.pid.toString();
  }
}

export class PropertyOperationCodecGetResult extends AbstractOperationCodec<PropertyOperation, any> {
  decodeObject(o: any): PropertyOperation {
    const property = new PropertyOperation();
    property.pid = PropertyID.parse(o[Spec.PID]);
    property.status = o[Spec.STATUS];

    if (property.status === undefined) {
      property.status = 0;
    }

    if (property.status == null) {
      property.status = 0;
    }

    if (property.status === 0) {
      const value = o[Spec.VALUE];
      if (value instanceof Array) {
        property.value = CombinationValueCodec.decodeArray(value);
      } else if (typeof value === 'object') {
        property.argumentsCompact = true;
        property.value = CombinationValueCodec.decodeObject(value);
      } else {
        property.value = value;
      }
    } else {
      property.description = o[Spec.DESCRIPTION];
    }

    return property;
  }

  encodeObject(property: PropertyOperation): any {
    const o: any = {
      pid: property.pid.toString()
    };

    if (property.status === 0) {
      if (property.value instanceof Map) {
        o[Spec.VALUE] = CombinationValueCodec.encodeWithCompact(property.argumentsCompact, property.value);
      } else {
        o[Spec.VALUE] = property.value;
      }
    } else {
      o[Spec.STATUS] = property.status;
      o[Spec.DESCRIPTION] = property.description;
    }

    return o;
  }
}

export class PropertyOperationCodecSetQuery extends AbstractOperationCodec<PropertyOperation, any> {
  decodeObject(o: any): PropertyOperation {
    const property = new PropertyOperation();
    const value = o[Spec.VALUE];
    property.pid = PropertyID.parse(o[Spec.PID]);
    if (value !== null) {
      if (value instanceof Array) {
        property.value = CombinationValueCodec.decodeArray(value);
      } else if (typeof value === 'object') {
        property.argumentsCompact = true;
        property.value = CombinationValueCodec.decodeObject(value);
      } else {
        property.value = value;
      }
    }

    return property;
  }

  encodeObject(property: PropertyOperation): any {
    return {
      pid: property.pid.toString(),
      value:
        property.value instanceof Map
          ? CombinationValueCodec.encodeWithCompact(property.argumentsCompact, property.value)
          : property.value
    };
  }
}

export class PropertyOperationCodecSetResult extends AbstractOperationCodec<PropertyOperation, any> {
  decodeObject(o: any): PropertyOperation {
    const property = new PropertyOperation();
    property.pid = PropertyID.parse(o[Spec.PID]);
    property.status = o[Spec.STATUS];

    if (property.status === undefined) {
      property.status = 0;
    }

    if (property.status == null) {
      property.status = 0;
    }

    if (property.status !== 0) {
      property.description = o[Spec.DESCRIPTION];
    }

    // if (property.description === undefined) {
    //     throw new Error('description undefined');
    // }

    return property;
  }

  encodeObject(property: PropertyOperation): any {
    const o: any = {
      pid: property.pid.toString(),
      status: property.status
    };

    if (property.status !== 0) {
      o[Spec.DESCRIPTION] = property.description;
    }

    return o;
  }
}

export class PropertyOperationCodecGet {
  QUERY: PropertyOperationCodecGetQuery = new PropertyOperationCodecGetQuery();

  RESULT: PropertyOperationCodecGetResult = new PropertyOperationCodecGetResult();
}

export class PropertyOperationCodecSet {
  QUERY: PropertyOperationCodecSetQuery = new PropertyOperationCodecSetQuery();

  RESULT: PropertyOperationCodecSetResult = new PropertyOperationCodecSetResult();
}

export class PropertyOperationCodec {
  public static Get: PropertyOperationCodecGet = new PropertyOperationCodecGet();

  public static Set: PropertyOperationCodecSet = new PropertyOperationCodecSet();

  public static Notify: PropertyOperationCodecSetQuery = new PropertyOperationCodecSetQuery();
}
