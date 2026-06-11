import {DeviceInstance} from "../../../../spec/typedef/instance/DeviceInstance";
import {SummaryController} from "./SummaryController";
import {ServiceController} from "./ServiceController";
import {Summary} from "../../../../spec/typedef/summary/Summary";
import {PropertyOperation} from "../../../../spec/typedef/operation/PropertyOperation";
import {IotError} from "../../../../spec/typedef/error/IotError";
import {Status} from "../../../../spec/typedef/status/Status";
import {EventOperation} from "../../../../spec/typedef/operation/EventOperation";
import {ActionOperation} from "../../../../spec/typedef/operation/ActionOperation";
import {PropertySetterWrapper} from "./operator/PropertySetterWrapper";
import {ActionInvokerWrapper} from "./operator/ActionInvokerWrapper";
import {PropertyController} from "./PropertyController";
import {ActionController} from "./ActionController";
import {SomewhereController} from "./SomewhereController";
import {Somewhere} from "../../../../spec/typedef/somewhere/Somewhere";
import {Urn} from "../../../../spec/typedef/definition/urn/Urn";

export class DeviceController extends DeviceInstance {

    did: string = 'xxx';
    summary!: SummaryController;
    somewhere!: SomewhereController;

    constructor(
        type: Urn,
        description: Map<string, string>,
        services: ServiceController[]
    ) {
        super(type, description, services);
    }

    public getServiceControllers(): ServiceController[] {
        const list = [];
        for (let value of this.services.values()) {
            if (value instanceof ServiceController) {
                list.push(value);
            }
        }

        return list;
    }

    public handleSummaryChanged(summary: Summary): boolean {
        return this.summary.update(summary);
    }

    public handleSomewhereChanged(somewhere: Somewhere): boolean {
        return this.somewhere.update(somewhere);
    }

    public handlePropertiesChanged(list: PropertyOperation[]): void {
        for (let o of list) {
            this.handlePropertyChanged(o);
        }
    }

    public handlePropertyChanged(o: PropertyOperation): void {
        const service = this.services.get(o.siid());
        if (service != null) {
            if (service instanceof ServiceController) {
                service.handlePropertyChanged(o);
            } else {
                throw new IotError(Status.INTERNAL_ERROR, "service not ServiceController");
            }
        } else {
            throw new IotError(Status.SERVICE_NOT_FOUND, "service not found: " + o.siid());
        }
    }

    public handleEventOccurred(e: EventOperation): void {
        const service = this.services.get(e.siid());
        if (service != null) {
            if (service instanceof ServiceController) {
                service.handleEventOccurred(e);
            } else {
                throw new IotError(Status.INTERNAL_ERROR, "service not ServiceController");
            }
        } else {
            throw new IotError(Status.SERVICE_NOT_FOUND, "service not found: " + e.siid());
        }
    }

    public setOperator(
        setter: ((property: PropertyOperation) => Promise<PropertyOperation>),
        invoker: ((action: ActionOperation) => Promise<ActionOperation>)
    ): void {
        for (let item of this.services) {
            const siid = item[0];
            const service = item[1];
            const setterWrapper = new PropertySetterWrapper(this.did, siid, setter);
            const invokerWrapper = new ActionInvokerWrapper(this.did, siid, invoker);

            for (let p of service.properties) {
                const property = p[1];
                if (property instanceof PropertyController) {
                    property.setter = setterWrapper
                }
            }

            for (let a of service.actions) {
                const action = a[1];
                if (action instanceof ActionController) {
                    action.invoker = invokerWrapper;
                }
            }
        }
    }
}
