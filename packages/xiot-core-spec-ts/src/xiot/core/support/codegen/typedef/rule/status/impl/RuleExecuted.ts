import {RuleStatus} from "../RuleStatus";
import {AbstractOperation} from "../../../../../../spec/typedef/operation/AbstractOperation";


export class RuleExecuted implements RuleStatus {

    constructor(
        public status: number,
        public description: string,
        public operations: AbstractOperation[]
    ) {
    }
}
