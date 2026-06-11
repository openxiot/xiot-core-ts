import {Spec} from '../../typedef/constant/Spec';
import {PropertyDefinitionCodec} from '../definition/PropertyDefinitionCodec';
import {Property} from '../../typedef/instance/Property';
import {DescriptionCodec} from '../definition/DescriptionCodec';
import {DataFormat, DataFormatFromString, DataFormatToString} from '../../typedef/definition/property/data/DataFormat';
import {ValueList} from '../../typedef/definition/property/ValueList';
import {ValueListCodec} from '../definition/ValueListCodec';
import {ValueRange} from '../../typedef/definition/property/ValueRange';
import {ValueRangeCodec} from '../definition/ValueRangeCodec';
import {PropertyType} from "../../typedef/definition/urn/PropertyType";
import {Access} from "../../typedef/definition/property/Access";
import {ConstraintValue} from "../../typedef/definition/property/ConstraintValue";

export class PropertyCodec {
    static decodeArray(array: any[]): Property[] {
        const list: Property[] = [];

        if (array != null) {
            for (const o of array) {
                list.push(PropertyCodec.decode(o));
            }
        }

        return list;
    }

    static decode(o: any): Property {
        const iid: number = o[Spec.IID];
        const type = new PropertyType(o[Spec.TYPE]);
        const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
        const format = DataFormatFromString(o[Spec.FORMAT]);
        const access = Access.create(o[Spec.ACCESS]);
        let unit: string | null = null;
        let constraintValue: ConstraintValue | null = null;
        let members = [];

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

        const property: Property =  new Property(
            iid,
            type,
            description,
            format,
            access,
            constraintValue,
            unit,
            members
        )

        // property.setDefaultValue(o[Spec.DEFAULT_VALUE]);
        // const property: Property = new Property(o[Spec.IID], PropertyDefinitionCodec.decode(o));

        if (o[Spec.DEFAULT_VALUE] != null) {
            property.setDefaultValue(o[Spec.DEFAULT_VALUE]);
        }

        return property;
    }

    static encode(property: Property): Object {
        const object: any = {
            iid: property.iid,
            type: property.type.toString(),
            description: DescriptionCodec.encode(property.description),
            format: DataFormatToString(property.format),
            access: property.access.toList()
        };

        if (property.constraintValue != null) {
            if (property.constraintValue instanceof ValueList) {
                object[Spec.VALUE_LIST] = ValueListCodec.encode(property.constraintValue);
            }

            if (property.constraintValue instanceof ValueRange) {
                object[Spec.VALUE_RANGE] = ValueRangeCodec.encode(property.constraintValue);
            }
        }

        if (property.unit != null) {
            object[Spec.UNIT] = property.unit;
        }

        if (property.members?.length > 0) {
            object[Spec.MEMBERS] = property.members;
        }

        if (property.value.defaultValue != null) {
            object[Spec.DEFAULT_VALUE] = property.value.defaultValue.rawValue();
        }

        return object;
    }

    static encodeArray(properties: Map<number, Property>): Array<Object> {
        const array: any[] = [];

        properties.forEach(property => {
            array.push(PropertyCodec.encode(property));
        });

        return array;
    }
}
