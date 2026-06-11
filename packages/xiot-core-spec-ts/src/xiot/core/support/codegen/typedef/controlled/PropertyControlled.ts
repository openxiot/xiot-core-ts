import {Property} from "../../../../spec/typedef/instance/Property";
import {PropertyID} from "../../../../spec/typedef/xid/PropertyID";
import {PropertyOperation} from "../../../../spec/typedef/operation/PropertyOperation";
import {DataFormat} from "../../../../spec/typedef/definition/property/data/DataFormat";
import {Status} from "../../../../spec/typedef/status/Status";

export class PropertyControlled extends Property {

    private observers: Map<string, (pid: PropertyID, value: Object) => void > = new Map();
    protected getter: (() => Promise<any>) | null = null;
    protected setter: ((value: any) => Promise<void>) | null = null;
    protected did: () => string = () => "empty";
    protected siid: () => number = () => 0;

    constructor(p: Property) {
        super(p.iid, p.type, p.description, p.format, p.access, p.constraintValue, p.unit, p.members)
    }

    public addObserver(observer: (pid: PropertyID, value: Object) => void): void {
        this.observers.set(observer.toString(), observer);
    }

    public get(): Promise<any> {
        if (this.getter != null) {
            return this.getter()
        } else {
            return new Promise((resolve, reject) => {
                reject("getter not found")
            })
        }
    }

    public set(value: any ): Promise<void> {
        if (this.setter != null) {
            return this.setter(value);
        } else {
            return new Promise((resolve, reject) => {
                reject("setter not found")
            });
        }
    }

    public get2(operation: PropertyOperation): Promise<PropertyOperation> {
        if (this.access.isReadable) {
            if (this.getter != null) {
                this.getter()
                    .then(value => {
                        if (this.format == DataFormat.COMBINATION) {
                            this.setValue(this.toMap(value))
                        } else {
                            this.setValue(value)
                        }
                        return operation;
                    })
                    .catch(error => {
                        operation.status = Status.PROPERTY_VALUE_ERROR;
                        operation.description = 'error: ' + error.message;
                        return operation;
                    })
            } else {
                operation.status = Status.INTERNAL_ERROR;
                operation.description = "property getter is null";
                return new Promise((resolve, reject) => {
                    resolve(operation)
                });
            }
        }

        operation.status = Status.PROPERTY_CANNOT_READ;
        operation.description = "property cannot read";
        return new Promise((resolve, reject) => {
            resolve(operation)
        });
    }

    public set2(operation: PropertyOperation): Promise<PropertyOperation> {
        if (this.access.isWritable) {
            if (this.setter != null) {
                const value = (this.format != DataFormat.COMBINATION) ?  operation.value : this.valueOf(operation.value());
                this.setter(value)
                    .then(x => {
                        super.setValue(operation.value());
                        this.doChange(value);
                        return operation;
                    })
                    .catch(error => {
                        operation.status = Status.PROPERTY_VALUE_ERROR;
                        operation.description = 'error: ' + error.message;
                        return operation;
                    });
            } else {
                operation.status = Status.INTERNAL_ERROR;
                operation.description = "property setter is null";
                return new Promise((resolve, reject) => {
                    resolve(operation)
                });
            }
        }

        operation.status = Status.PROPERTY_CANNOT_WRITE;
        operation.description = "property cannot write";
        return new Promise((resolve, reject) => {
            resolve(operation)
        });
    }

    public doChange(v: any): void {
        const pid = this.pid();

        if (this.format == DataFormat.COMBINATION) {
            for (let item of this.observers) {
                const observer = item[1];
                observer(pid, this.toMap(v))
            }
        } else {
            for (let item of this.observers) {
                const observer = item[1];
                observer(pid, v)
            }
        }
    }

    private pid(): PropertyID {
        return PropertyID.create(this.did(), this.siid(), this.iid);
    }

    // private <X extends AbstractOperation> Future<X> execute(OperationIntentType type, X operation) {
    //     Promise<X> promise = Promise.promise();
    //
    //     switch (type) {
    //         case GET_PROPERTIES:
    //             get((PropertyOperation)operation)
    //                     .onComplete(ar -> {
    //                         if (ar.succeeded()) {
    //                             promise.complete((X) ar.result());
    //                         } else {
    //                             promise.fail(ar.cause());
    //                         }
    //                     });
    //             break;
    //
    //         case SET_PROPERTIES:
    //             set((PropertyOperation)operation)
    //                     .onComplete(ar -> {
    //                         if (ar.succeeded()) {
    //                             promise.complete((X) ar.result());
    //                         } else {
    //                             promise.fail(ar.cause());
    //                         }
    //                     });
    //             break;
    //
    //         default:
    //             throw new IllegalStateException("Unexpected value: " + type);
    //     }
    //
    //     return promise.future();
    // }
}