import {Service} from "../../../../spec/typedef/instance/Service";
import {ServiceType} from "../../../../spec/typedef/definition/urn/ServiceType";
import {PropertyController} from "./PropertyController";
import {ActionController} from "./ActionController";
import {EventController} from "./EventController";
import {PropertyOperation} from "../../../../spec/typedef/operation/PropertyOperation";
import {EventOperation} from "../../../../spec/typedef/operation/EventOperation";
import {IotError} from "../../../../spec/typedef/error/IotError";
import {Status} from "../../../../spec/typedef/status/Status";

export class ServiceController extends Service {

    constructor(
        iid: number,
        type: ServiceType,
        description: Map<string, string>,
        properties: PropertyController[],
        actions: ActionController[],
        events: EventController[]
    ) {
        super(iid, type, description, properties, actions, events)
    }

    public getPropertyControllers(): PropertyController[] {
        const list = [];
        for (let value of this.properties.values()) {
            if (value instanceof PropertyController) {
                list.push(value);
            }
        }

        return list;
    }

    public getActionControllers(): ActionController[] {
        const list = [];
        for (let value of this.actions.values()) {
            if (value instanceof ActionController) {
                list.push(value);
            }
        }

        return list;
    }

    public getEventControllers(): EventController[] {
        const list = [];
        for (let value of this.events.values()) {
            if (value instanceof EventController) {
                list.push(value);
            }
        }

        return list;
    }

    handlePropertyChanged(o: PropertyOperation): void {
        const p = this.properties.get(o.pid.iid);
        if (p != null) {
            if (p instanceof PropertyController) {
                p.handlePropertyChanged(o);
            } else {
                throw new IotError(Status.INTERNAL_ERROR, "property not PropertyController");
            }
        } else {
            throw new IotError(Status.PROPERTY_NOT_FOUND, "property not found: " + o.iid());
        }
    }

    handleEventOccurred(o: EventOperation): void {
        const e = this.events.get(o.eid.iid);
        if (e != null) {
            if (e instanceof EventController) {
                e.handleEventOccurred(o);
            } else {
                throw new IotError(Status.INTERNAL_ERROR, "event not EventController");
            }
        } else {
            throw new IotError(Status.PROPERTY_NOT_FOUND, "event not found: " + o.iid());
        }
    }
}
