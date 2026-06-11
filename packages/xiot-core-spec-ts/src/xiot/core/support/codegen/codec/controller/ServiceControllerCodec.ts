import {ServiceController} from "../../typedef/controller/ServiceController";
import {Spec} from "../../../../spec/typedef/constant/Spec";
import {DescriptionCodec} from "../../../../spec/codec/definition/DescriptionCodec";
import {ServiceType} from "../../../../spec/typedef/definition/urn/ServiceType";
import {PropertyControllerCodec} from "./PropertyControllerCodec";
import {EventControllerCodec} from "./EventControllerCodec";
import {ActionControllerCodec} from "./ActionControllerCodec";


export class ServiceControllerCodec {

    private static decodeObject(o: any): ServiceController {
        const iid = o[Spec.IID] || 0;
        const type = ServiceType.parse(o[Spec.TYPE]);
        const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
        const properties = PropertyControllerCodec.decodeArray(o[Spec.PROPERTIES]);
        const actions = ActionControllerCodec.decodeArray(o[Spec.ACTIONS]);
        const events = EventControllerCodec.decodeArray(o[Spec.EVENTS]);
        return new ServiceController(iid, type, description, properties, actions, events);
    }

    public static decodeArray(array: any[]): ServiceController[] {
        const services: ServiceController[] = [];

        if (array != null) {
            for (let item of array) {
                services.push(ServiceControllerCodec.decodeObject(item));
            }
        }

        return services;
    }
}
