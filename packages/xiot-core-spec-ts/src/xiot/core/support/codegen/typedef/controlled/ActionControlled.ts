import {Action} from "../../../../spec/typedef/instance/Action";
import {ActionOperation} from "../../../../spec/typedef/operation/ActionOperation";
import {ActionType} from "../../../../spec/typedef/definition/urn/ActionType";
import {Argument} from "../../../../spec/typedef/instance/Argument";
import {Status} from "../../../../spec/typedef/status/Status";

export class ActionControlled extends Action {

    private invoker: ((action: ActionOperation) => Promise<ActionOperation>) | undefined;

    constructor(
        iid: number,
        type: ActionType,
        description: Map<string, string>,
        argumentsIn: Argument[],
        argumentsOut: Argument[]
    ) {
        super(iid, type, description, argumentsIn, argumentsOut);
    }

    public  invoke(action: ActionOperation ): Promise<ActionOperation> {
        console.debug("invoke: " + action);

        if (this.invoker != null) {
            return this.invoker(action);
        } else {
            console.error("invoke failed, invoker not implemented");
            action.status = Status.INTERNAL_ERROR;
            action.description = "not implemented";

            return new Promise((resolve, reject) => {
                resolve(action)
            })
        }
    }
}
