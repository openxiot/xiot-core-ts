import {ActionType} from "../../../../spec/typedef/definition/urn/ActionType";
import {Action} from "../../../../spec/typedef/instance/Action";
import {ActionInvokerWrapper} from "./operator/ActionInvokerWrapper";
import {Argument} from "../../../../spec/typedef/instance/Argument";
import {Result} from "../result/Result";

export class ActionController extends Action {

    public invoker!: ActionInvokerWrapper;

    constructor(
        iid: number,
        type: ActionType,
        description: Map<string, string>,
        argumentsIn: Argument[],
        argumentsOut: Argument[]
    ) {
        super(iid, type, description, argumentsIn, argumentsOut);
    }

    /*----------------------------------------------------------------------
     * for debugger
     *----------------------------------------------------------------------*/
    public _result: Result = new Result();
}
