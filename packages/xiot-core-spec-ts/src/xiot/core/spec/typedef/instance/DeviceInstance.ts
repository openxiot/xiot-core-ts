import {Service} from './Service';
import {Urn} from "../definition/urn/Urn";

export class DeviceInstance {

    services: Map<number, Service> = new Map<number, Service>();

    constructor(
        public type: Urn,
        public description: Map<string, string>,
        services: Service[]
    ) {
        services.forEach(x => {
            return this.services.set(x.iid, x);
        });
    }

    getServices(): Service[] {
        return Array.from(this.services.values());
    }
}
