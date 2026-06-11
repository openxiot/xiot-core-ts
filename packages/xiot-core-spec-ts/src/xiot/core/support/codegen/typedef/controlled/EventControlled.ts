import {Event} from "../../../../spec/typedef/instance/Event";
import {EventType} from "../../../../spec/typedef/definition/urn/EventType";
import {Argument} from "../../../../spec/typedef/instance/Argument";
import {EventOperation} from "../../../../spec/typedef/operation/EventOperation";
import { EventID } from "../../../../spec/typedef/xid/EventID";
import {ArgumentOperation} from "../../../../spec/typedef/operation/ArgumentOperation";

export class EventControlled extends Event {

    protected observers: Map<String, ((eid: EventID, list: ArgumentOperation[]) => void)> = new Map();

    constructor(
        iid: number,
        type: EventType,
        description: Map<string, string>,
        list: Argument[]
    ) {
        super(iid, type, description, list);
    }

    public addObserver(observer: ((eid: EventID, list: ArgumentOperation[]) => void )) {
        this.observers.set(observer.toString(), observer);
    }

    public doOccurred(o: EventOperation): void {
        for (let item of this.observers) {
            const observer = item[1];
            observer(o.eid, o.getArguments());
        }
    }
}