import {FormatType} from './urn/FormatType';
import {WithLifecycle} from '../lifecycle/WithLifecycle';

export class FormatDefinition extends WithLifecycle {
    type: FormatType;

    description: Map<string, string> = new Map<string, string>();

    constructor(type: FormatType, description: Map<string, string>) {
        super();
        this.type = type;
        this.description = description;
    }
}
