import {RuleStatus} from "../RuleStatus";
import {AbstractOperation} from "../../../../../../spec/typedef/operation/AbstractOperation";

export class RuleTriggered implements RuleStatus {

    constructor(
        public trigger: AbstractOperation
    ) {
        this.trigger = trigger;
    }
}
