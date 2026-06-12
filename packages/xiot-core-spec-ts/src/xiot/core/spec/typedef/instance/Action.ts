import {ActionType} from '../definition/urn/ActionType';
import {Argument} from './Argument';
import {ActionOperation} from '../operation/ActionOperation';
import {ArgumentOperation} from '../operation/ArgumentOperation';
import {Property} from "./Property";
import {Status} from "../status/Status";
import {DataFormat} from "../definition/property/data/DataFormat";

export class Action {
    iid = 0;

    type: ActionType;

    description: Map<string, string> = new Map<string, string>();

    in: Map<number, Argument> = new Map<number, Argument>();

    out: Map<number, Argument> = new Map<number, Argument>();

    constructor(
        iid: number,
        type: ActionType,
        description: Map<string, string>,
        argumentsIn: Argument[],
        argumentsOut: Argument[]
    ) {
        this.iid = iid;
        this.type = type;
        this.description = description;
        argumentsIn.forEach(x => {
            return this.in.set(x.piid, x);
        });
        argumentsOut.forEach(x => {
            return this.out.set(x.piid, x);
        });
    }

    getArgumentsIn(): Argument[] {
        return Array.from(this.in.values());
    }

    getArgumentsOut(): Argument[] {
        return Array.from(this.out.values());
    }

    addArgumentIn(arg: Argument): void {
        this.in.set(arg.piid, arg);
    }

    addArgumentOut(arg: Argument): void {
        this.out.set(arg.piid, arg);
    }

    /*----------------------------------------------------------------------
  * for debugger
  *----------------------------------------------------------------------*/
    public tryInvoke(o: ActionOperation, properties: Map<number, Property>): void {
        o.status = Status.COMPLETED;

        for (const def of Array.from(this.in.values())) {
            const arg = o.in.get(def.piid);
            this.checkArgumentCount(o, arg, def);

            if (o.isError()) {
                break;
            }

            if (!arg) {
                continue;
            }

            this.checkArgumentValue(o, arg, def, properties);

            if (o.isError()) {
                break;
            }
        }
    }

    private checkArgumentCount(o: ActionOperation, arg: ArgumentOperation | undefined, def: Argument): void {
        if (arg === undefined) {
            if (def.minRepeat > 0) {
                o.status = Status.ACTION_IN_ERROR;
                o.description = "action in is null !";
            }
        } else {
            if (arg.values.length > def.maxRepeat) {
                o.status = Status.ACTION_IN_ERROR;
                o.description = "action in.size() > maxRepeat !";
            }
        }
    }

    private checkArgumentValue(o: ActionOperation, arg: ArgumentOperation, def: Argument, properties: Map<number, Property>): void {
        const property = properties.get(def.piid);
        if (property === undefined) {
            o.status = Status.INTERNAL_ERROR;
            o.description = `找不到参数的属性定义: ${def.piid}`;
            return;
        }

        if (property.format === DataFormat.COMBINATION) {
            this.checkArgumentValueByCombinationValue(o, arg, def, property, properties);
        } else {
            this.checkArgumentValueByRawValue(o, arg, def, property);
        }
    }

    private checkArgumentValueByCombinationValue(o: ActionOperation, arg: ArgumentOperation, def: Argument, property: Property, properties: Map<number, Property>): void {
        for (const argValue of arg.values) {
            if (!(argValue instanceof Map)) {
                o.status = Status.ACTION_IN_VALUE_INVALID;
                o.description = `combination value invalid: ${typeof argValue}`;
                break;
            }

            this.checkCombinationValue(o, argValue as Map<number, any>, property, properties);

            if (o.isError()) {
                break;
            }
        }
    }

    private checkCombinationValue(o: ActionOperation, argValue: Map<number, any>, property: Property, properties: Map<number, Property>): void {
        for (const piid of property.members) {
            const value = argValue.get(piid);
            if (value === undefined || value === null) {
                o.status = Status.ACTION_IN_VALUE_INVALID;
                o.description = `the member value in combination is null: piid: [${piid}]`;
                break;
            }

            const member = properties.get(piid) as Property;
            if (member === undefined) {
                o.status = Status.INTERNAL_ERROR;
                o.description = `找不到组合参数的成员属性定义: ${piid}`;
                break;
            }

            // 尝试写属性值，进行校验
            if (!member.trySetValue(value)) {
                o.status = Status.PROPERTY_VALUE_INVALID;
                o.description = `组合参数的成员属性值非法: piid: [${piid}], value: [${value}]`;
                break;
            }

            // 如果argValue的值是浮点型，而property.value是整型，则帮argValue修正值为整型。布尔型不进行修正。
            if (member.format !== DataFormat.BOOL) {
                argValue.set(piid, value);
            } else {
                // 当为bool类型，针对decimal数据做数据修复
                // if (value instanceof BigDecimal) {
                //   argValue.set(piid, (value as BigDecimal).intValue());
                // }
            }
        }
    }

    private checkArgumentValueByRawValue(o: ActionOperation, arg: ArgumentOperation, def: Argument, property: Property): void {
        if (property.trySetValues(arg.values)) {
            // 假设这里不需要额外处理
        } else {
            o.status = Status.ACTION_IN_VALUE_INVALID;
            o.description = "action in value invalid, piid: " + def.piid;
        }
    }
}
