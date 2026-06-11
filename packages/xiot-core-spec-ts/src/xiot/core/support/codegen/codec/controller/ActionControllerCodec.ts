import {ActionController} from "../../typedef/controller/ActionController";
import {Spec} from "../../../../spec/typedef/constant/Spec";
import {DescriptionCodec} from "../../../../spec/codec/definition/DescriptionCodec";
import {ArgumentCodec} from "../../../../spec/codec/instance/ArgumentCodec";
import {ActionType} from "../../../../spec/typedef/definition/urn/ActionType";

export class ActionControllerCodec {

    private ActionControllerCodec() {
    }

    private static decodeObject(o: any): ActionController {
        const iid = o[Spec.IID] || 0;
        const type = ActionType.parse(o[Spec.TYPE]);
        const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
        const argumentsIn = ArgumentCodec.decodeArray(o[Spec.IN]);
        const argumentsOut = ArgumentCodec.decodeArray(o[Spec.OUT]);
        return new ActionController(iid, type, description, argumentsIn, argumentsOut);
    }

    public static decodeArray(array: any[]): ActionController[] {
        const actions: ActionController[] = [];

        if (array != null) {
            for (let item of array) {
                actions.push(this.decodeObject(item));
            }
        }

        return actions;
    }
}
