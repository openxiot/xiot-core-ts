import {DeviceType} from './urn/DeviceType';
import {WithLifecycle} from '../lifecycle/WithLifecycle';

export class DeviceDefinition extends WithLifecycle {

    type: DeviceType;

    description: Map<string, string> = new Map<string, string>();

    constructor(type: DeviceType, description: Map<string, string>) {
        super();
        this.type = type;

        if (description != null) {
            this.description = description;
        }
    }
}
