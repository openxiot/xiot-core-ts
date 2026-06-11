import {IQQuery} from '../../IQQuery';
import {IQResult} from '../../IQResult';
import {DeviceOwner} from "@openxiot/xiot-core-spec-ts";

export const REMOVE_OWNER_METHOD = 'urn:xiot:remove-owner';

export class QueryRemoveOwner extends IQQuery {
    owner: DeviceOwner;

    constructor(id: string, owner: DeviceOwner) {
        super(id, REMOVE_OWNER_METHOD);
        this.owner = owner;
    }

    public result(): ResultRemoveOwner {
        return new ResultRemoveOwner(this.id);
    }
}

export class ResultRemoveOwner extends IQResult {

    constructor(id: string) {
        super(id, REMOVE_OWNER_METHOD);
    }
}
