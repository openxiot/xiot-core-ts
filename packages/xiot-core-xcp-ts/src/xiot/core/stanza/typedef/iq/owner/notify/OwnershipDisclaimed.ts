import {IQQuery} from '../../IQQuery';
import {IQResult} from '../../IQResult';
import {DeviceOwner} from "@gkct/xiot-core-spec-ts";

export const OWNERSHIP_DISCLAIMED_METHOD = 'urn:xiot:ownership-disclaimed';

export class QueryOwnershipDisclaimed extends IQQuery {
    owner: DeviceOwner;

    constructor(id: string, owner: DeviceOwner) {
        super(id, OWNERSHIP_DISCLAIMED_METHOD);
        this.owner = owner;
    }

    public result(): ResultOwnershipDisclaimed {
        return new ResultOwnershipDisclaimed(this.id);
    }
}

export class ResultOwnershipDisclaimed extends IQResult {

    constructor(id: string) {
        super(id, OWNERSHIP_DISCLAIMED_METHOD);
    }
}
