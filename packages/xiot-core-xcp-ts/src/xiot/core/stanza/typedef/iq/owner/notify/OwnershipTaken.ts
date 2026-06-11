import {IQQuery} from '../../IQQuery';
import {IQResult} from '../../IQResult';
import {DeviceOwner} from "@openxiot/xiot-core-spec-ts";

export const OWNERSHIP_TAKEN_METHOD = 'urn:xiot:ownership-taken';

export class QueryOwnershipTaken extends IQQuery {
    owner: DeviceOwner;

    constructor(id: string, owner: DeviceOwner) {
        super(id, OWNERSHIP_TAKEN_METHOD);
        this.owner = owner;
    }

    public result(): ResultOwnershipTaken {
        return new ResultOwnershipTaken(this.id);
    }
}

export class ResultOwnershipTaken extends IQResult {

    constructor(id: string) {
        super(id, OWNERSHIP_TAKEN_METHOD);
    }
}
