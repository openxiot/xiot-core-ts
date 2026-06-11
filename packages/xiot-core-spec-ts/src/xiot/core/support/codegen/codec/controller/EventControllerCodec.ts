import {EventController} from "../../typedef/controller/EventController";
import {Spec} from "../../../../spec/typedef/constant/Spec";
import {EventType} from "../../../../spec/typedef/definition/urn/EventType";
import {DescriptionCodec} from "../../../../spec/codec/definition/DescriptionCodec";
import {ArgumentCodec} from "../../../../spec/codec/instance/ArgumentCodec";

export class EventControllerCodec {

    private EventControllerCodec() {
    }

    public static decodeObject(o: any): EventController {
        const iid = o[Spec.IID] || 0;
        const type = EventType.parse(o[Spec.TYPE]);
        const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
        const list = ArgumentCodec.decodeArray(o[Spec.ARGUMENTS]);
        return new EventController(iid, type, description, list);
    }

    public static decodeArray(array: any[]): EventController[] {
        const events: EventController[] = [];

        if (array != null) {
            for (let item of array) {
                events.push(EventControllerCodec.decodeObject(item));
            }
        }

        return events;
    }
}
