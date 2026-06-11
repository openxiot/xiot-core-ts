import {ActionOperation} from "../../../../../spec/typedef/operation/ActionOperation";
import {ArgumentOperation} from "../../../../../spec/typedef/operation/ArgumentOperation";
import {ActionID} from "../../../../../spec/typedef/xid/ActionID";

export class ActionInvokerWrapper {

    constructor(
        public did: string = '',
        public siid: number = 0,
        public operator: (action: ActionOperation) => Promise<ActionOperation>
    ) {
    }

    public call(iid: number, params: Map<number, ArgumentOperation>): Promise<Map<number, ArgumentOperation>> {
        const action: ActionOperation = new ActionOperation();
        action.aid = ActionID.create(this.did, this.siid, iid);
        action.in = params;
        return this.operator(action)
            .then(x => {
                if (x.isCompleted()) {
                    return x.out;
                } else {
                    throw new Error(x.description)
                }
            });
    }
}
