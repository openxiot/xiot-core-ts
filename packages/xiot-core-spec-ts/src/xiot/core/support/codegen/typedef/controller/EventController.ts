import {Event} from "../../../../spec/typedef/instance/Event";
import {EventType} from "../../../../spec/typedef/definition/urn/EventType";
import {Argument} from "../../../../spec/typedef/instance/Argument";
import {EventOperation} from "../../../../spec/typedef/operation/EventOperation";

export class EventController extends Event {

    constructor(
        iid: number,
        type: EventType,
        description: Map<string, string>,
        list: Argument[]
    ) {
        super(iid, type, description, list);
    }

    public handleEventOccurred(o: EventOperation) {
    }
}
