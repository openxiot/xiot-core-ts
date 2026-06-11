import {AbstractOperation} from "../../operation/AbstractOperation";

export interface RuleExecutionListener {

    onTriggered(ruleId: string, trigger: AbstractOperation): void;

    onExecuted(ruleId: string, status: number, description: string, operations: AbstractOperation[]): void;
}
