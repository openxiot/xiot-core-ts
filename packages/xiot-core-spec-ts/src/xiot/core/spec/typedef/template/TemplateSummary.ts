import {DeviceType} from '../definition/urn/DeviceType';
import {WithLifecycle} from '../lifecycle/WithLifecycle';

export class TemplateSummary extends WithLifecycle {

    constructor(
        public type: DeviceType,
        public description: Map<string, string>
    ) {
        super();
        this.type = type;

        if (description != null) {
            this.description = description;
        }
    }
}
