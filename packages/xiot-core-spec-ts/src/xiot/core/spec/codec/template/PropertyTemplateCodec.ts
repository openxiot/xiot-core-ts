import {PropertyTemplate} from '../../typedef/template/PropertyTemplate';
import {Spec} from '../../typedef/constant/Spec';
import {PropertyCodec} from '../instance/PropertyCodec';
import {PropertyType} from "../../typedef/definition/urn/PropertyType";
import {DescriptionCodec} from "../definition/DescriptionCodec";
import {DataFormat, DataFormatFromString} from "../../typedef/definition/property/data/DataFormat";
import {Access} from "../../typedef/definition/property/Access";
import {ConstraintValue} from "../../typedef/definition/property/ConstraintValue";
import {PropertyDefinitionCodec} from "../definition/PropertyDefinitionCodec";
import {ValueListCodec} from "../definition/ValueListCodec";
import {ValueRangeCodec} from "../definition/ValueRangeCodec";

export class PropertyTemplateCodec {
  static decodeArray(array: any[]): PropertyTemplate[] {
    const list: PropertyTemplate[] = [];

    if (array != null) {
      for (const o of array) {
        list.push(PropertyTemplateCodec.decode(o));
      }
    }

    return list;
  }

  static decode(o: any): PropertyTemplate {
    const iid: number = o[Spec.IID];
    const type = new PropertyType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const format = DataFormatFromString(o[Spec.FORMAT]);
    const access = Access.create(o[Spec.ACCESS]);
    let unit: string | null = null;
    let constraintValue: ConstraintValue | null = null;
    let members = [];
    const required = o[Spec.X_REQUIRED];
    const source = o[Spec.X_SOURCE];

    if (format === DataFormat.COMBINATION) {
      const members = PropertyDefinitionCodec.decodeMembers(o[Spec.MEMBERS]);
    } else {
      if (o.hasOwnProperty(Spec.VALUE_LIST) && o.hasOwnProperty(Spec.VALUE_RANGE)) {
        throw new Error('value-list & value-range both exist!');
      }

      if (o.hasOwnProperty(Spec.VALUE_LIST)) {
        constraintValue = ValueListCodec.decode(format, o[Spec.VALUE_LIST]);
      }

      if (o.hasOwnProperty(Spec.VALUE_RANGE)) {
        constraintValue = ValueRangeCodec.decode(format, o[Spec.VALUE_RANGE]);
      }
    }

    if (o.hasOwnProperty(Spec.UNIT)) {
      unit = o[Spec.UNIT];
    }

    if (o.hasOwnProperty(Spec.MEMBERS)) {
      members = o[Spec.MEMBERS];
    }

    const property: PropertyTemplate =  new PropertyTemplate(
        iid,
        type,
        description,
        format,
        access,
        constraintValue,
        unit,
        members,
        required,
        source
    )

    if (o[Spec.DEFAULT_VALUE] != null) {
        property.setDefaultValue(o[Spec.DEFAULT_VALUE]);
    }

    return property;
  }

  static encode(property: PropertyTemplate): Object {
    const o: any = PropertyCodec.encode(property);
    o[Spec.IID] = property.iid;
    o[Spec.X_REQUIRED] = property.required;
    if (property.source) {
        o[Spec.X_SOURCE] = property.source;
    }
    return o;
  }

  static encodeArray(properties: Map<number, PropertyTemplate>): Array<Object> {
    const array: any[] = [];

    properties.forEach(property => {
      array.push(PropertyTemplateCodec.encode(property));
    });

    return array;
  }
}
