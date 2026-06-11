import { PropertyController } from "../../typedef/controller/PropertyController";
import {PropertyCodec} from "../../../../spec/codec/instance/PropertyCodec";

export class PropertyControllerCodec {

    private PropertyControllerCodec() {
    }

    public static decodeArray(array: any[]): PropertyController[] {
        const properties: PropertyController[] = [];

        if (array != null) {
            for (let item of array) {
                properties.push(this.decodeObject(item));
            }
        }

        return properties;
    }

    private static decodeObject(object: any): PropertyController {
        return new PropertyController(PropertyCodec.decode(object));
    }

    public static encode(property: PropertyController) {
        return PropertyCodec.encode(property);
    }
}
