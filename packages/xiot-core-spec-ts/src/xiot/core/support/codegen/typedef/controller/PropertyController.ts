import {Property} from "../../../../spec/typedef/instance/Property";
import {PropertyOperation} from "../../../../spec/typedef/operation/PropertyOperation";
import {PropertySetterWrapper} from "./operator/PropertySetterWrapper";
import {DataFormat, DataFormatToString} from "../../../../spec/typedef/definition/property/data/DataFormat";
import {Result} from "../result/Result";
import {ValueRange} from "../../../../spec/typedef/definition/property/ValueRange";
import {ValueList} from "../../../../spec/typedef/definition/property/ValueList";
import {PropertyValue} from "../../../../spec/typedef/instance/PropertyValue";

export class PropertyController extends Property {

    public setter!: PropertySetterWrapper;
    private observers: Map<string, ((value: any) => void)> = new Map();

    constructor(p: Property) {
        super(p.iid, p.type, p.description, p.format, p.access, p.constraintValue, p.unit, p.members);
        this.value = PropertyValue.copy(p.value);
    }

    public addObserver(observer: ((value: any) => void)): void {
        this.observers.set(observer.toString(), observer);
    }

    public removeObserver(observer: ((value: any) => void)): void {
        this.observers.delete(observer.toString());
    }

    public handlePropertyChanged(o: PropertyOperation): void {
        super.setValueForOperation(o);

        if (o.isCompleted()) {
            this.observers.forEach((observer, id) => {
                observer(this.getValue())
            });
        } else {
            console.log(`PropertyOperation: ${o.status} ${o.description}` );
        }
    }

    public set(value: any): Promise<any> {
        if (this.access.isWritable) {
            if (this.setter != null) {
                if (this.format == DataFormat.COMBINATION) {
                    return this.setter.call(this.iid, this.toMap(value))
                        .then(value);
                } else {
                    return this.setter.call(this.iid, value)
                        .then(value);
                }
            } else {
                return new Promise((resolve, reject) => {
                    reject("property set: not implemented")
                })
            }
        }

        return new Promise((resolve, reject) => {
            reject("property cannot write")
        })
    }

    /*----------------------------------------------------------------------
     * for debugger
     *----------------------------------------------------------------------*/

    public _result: Result = new Result();

    getFormatString(): string {
        return DataFormatToString(this.format);
    }

    isEditableTextValue(): boolean {
        if (this.valueList() != null) {
            return false;
        }

        if (this.format === DataFormat.BOOL) {
            return false;
        }

        return this.access.isWritable;
    }

    isReadOnlyTextValue(): boolean {
        if (this.valueList() != null) {
            return false;
        }

        if (this.format === DataFormat.BOOL) {
            return false;
        }

        if (this.access.isWritable) {
            return false;
        }

        return this.access.isReadable;
    }

    formatBoolean(): boolean {
        return this.format === DataFormat.BOOL;
    }

    formatNumber(): boolean {
        switch (this.format) {
            case DataFormat.UINT8:
            case DataFormat.UINT16:
            case DataFormat.UINT32:
            case DataFormat.INT8:
            case DataFormat.INT16:
            case DataFormat.INT32:
            case DataFormat.INT64:
            case DataFormat.FLOAT:
                return true;

            default:
                return false;
        }
    }

    formatString(): boolean {
        switch (this.format) {
            case DataFormat.STRING:
            case DataFormat.TLV8:
            case DataFormat.HEX:
                return true;

            default:
                return false;
        }
    }

    hasConstraintValue(): boolean {
        return this.constraintValue != null;
    }

    hasValueRange(): boolean {
        if (this.constraintValue == null) {
            return false;
        }

        return this.constraintValue instanceof ValueRange;
    }

    hasValueList(): boolean {
        if (this.constraintValue == null) {
            return false;
        }

        return this.constraintValue instanceof ValueList;
    }

    valueRange(): ValueRange | null {
        if (this.constraintValue == null) {
            return null;
        }

        if (this.constraintValue instanceof ValueRange) {
            return this.constraintValue;
        }

        return null;
    }

    valueList(): ValueList | null {
        if (this.constraintValue !== null) {
            if (this.constraintValue instanceof ValueList) {
                return this.constraintValue;
            }
        }

        return null;
    }
}
