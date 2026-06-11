import {PropertyOperation} from "../../../../../spec/typedef/operation/PropertyOperation";
import {PropertyID} from "../../../../../spec/typedef/xid/PropertyID";

export class PropertySetterWrapper {

    constructor(
        public did: string = '',
        public siid: number = 0,
        public operator: (property: PropertyOperation) => Promise<PropertyOperation>
    ) {
    }

    public call(iid: number, value: any): Promise<void> {
        const property: PropertyOperation = new PropertyOperation();
        property.pid = PropertyID.create(this.did, this.siid, iid);
        property.value = value;
        return this.operator(property)
            .then(x => {
                if (x.isCompleted()) {
                    return;
                } else {
                    throw new Error(x.description)
                }
            });
    }
}
