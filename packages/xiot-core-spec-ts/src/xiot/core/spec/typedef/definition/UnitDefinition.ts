import {UnitType} from './urn/UnitType';
import {WithLifecycle} from '../lifecycle/WithLifecycle';

export class UnitDefinition extends WithLifecycle {
    type: UnitType;

    description: Map<string, string> = new Map<string, string>();

    constructor(type: UnitType, description: Map<string, string>) {
        super();
        this.type = type;
        this.description = description;
    }
}
