import {ActionType} from './urn/ActionType';
import {ArgumentDefinition} from './ArgumentDefinition';
import {WithLifecycle} from '../lifecycle/WithLifecycle';

export class ActionDefinition extends WithLifecycle {
    type: ActionType;

    description: Map<string, string> = new Map<string, string>();

    in: ArgumentDefinition[] = [];

    out: ArgumentDefinition[] = [];

    constructor(
        type: ActionType,
        description: Map<string, string>,
        argumentsIn: ArgumentDefinition[],
        argumentsOut: ArgumentDefinition[]
    ) {
        super();
        this.type = type;

        if (description != null) {
            this.description = description;
        }

        if (argumentsIn != null) {
            this.in = argumentsIn;
        }

        if (argumentsOut != null) {
            this.out = argumentsOut;
        }
    }
}
