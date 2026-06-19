import {DeviceType} from '../definition/urn/DeviceType';
import {ServiceTemplate} from './ServiceTemplate';
import {WithLifecycle} from '../lifecycle/WithLifecycle';

export class DeviceTemplate extends WithLifecycle {
    type: DeviceType;

    description: Map<string, string> = new Map<string, string>();

    services: Map<number, ServiceTemplate> = new Map<number, ServiceTemplate>();

    constructor(type: DeviceType, description: Map<string, string>, services: ServiceTemplate[]) {
        super();
        this.type = type;

        if (description != null) {
            this.description = description;
        }

        services.forEach(x => {
            return this.services.set(x.iid, x);
        });
    }

    getServices(): ServiceTemplate[] {
        return Array.from(this.services.values());
    }
}
