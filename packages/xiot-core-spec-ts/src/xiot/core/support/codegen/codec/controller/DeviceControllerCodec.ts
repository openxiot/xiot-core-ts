import {DeviceController} from "../../typedef/controller/DeviceController";
import {DeviceType} from "../../../../spec/typedef/definition/urn/DeviceType";
import {Spec} from "../../../../spec/typedef/constant/Spec";
import {DescriptionCodec} from "../../../../spec/codec/definition/DescriptionCodec";
import {ServiceControllerCodec} from "./ServiceControllerCodec";
import {UrnType} from "../../../../spec/typedef/definition/urn/UrnType";
import {Urn} from "../../../../spec/typedef/definition/urn/Urn";

export class DeviceControllerCodec {

    private DeviceControllerCodec() {
    }

    public static decode(o: any): DeviceController {
        const type = new Urn([UrnType.DEVICE, UrnType.GROUP], o[Spec.TYPE]);
        const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
        const services = ServiceControllerCodec.decodeArray(o[Spec.SERVICES]);
        return new DeviceController(type, description, services);
    }
}
