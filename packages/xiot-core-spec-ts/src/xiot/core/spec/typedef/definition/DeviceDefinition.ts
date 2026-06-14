import {DeviceType} from './urn/DeviceType';
import {WithLifecycle} from '../lifecycle/WithLifecycle';

export class DeviceDefinition extends WithLifecycle {

    category!: string;
    type: DeviceType;

    description: Map<string, string> = new Map<string, string>();

    constructor(category: string, type: DeviceType, description: Map<string, string>) {
        super();
        this.category = category;
        this.type = type;

        if (description != null) {
            this.description = description;
        }
    }
}
