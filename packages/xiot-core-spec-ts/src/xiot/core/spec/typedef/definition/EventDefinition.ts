import {EventType} from './urn/EventType';
import {ArgumentDefinition} from './ArgumentDefinition';
import {WithLifecycle} from '../lifecycle/WithLifecycle';

export class EventDefinition extends WithLifecycle {
    type: EventType;

    description: Map<string, string> = new Map<string, string>();

    arguments: ArgumentDefinition[] = [];

    constructor(type: EventType, description: Map<string, string>, a: ArgumentDefinition[]) {
        super();
        this.type = type;

        if (description != null) {
            this.description = description;
        }
        if (a != null) {
            this.arguments = a;
        }
    }
}
