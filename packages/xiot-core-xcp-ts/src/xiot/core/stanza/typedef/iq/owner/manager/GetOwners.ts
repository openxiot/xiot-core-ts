import {IQQuery} from '../../IQQuery';
import {IQResult} from '../../IQResult';
import {DeviceOwner} from "@gkct/xiot-core-spec-ts";

export const GET_OWNERS_METHOD = 'urn:xiot:get-owners';

export class QueryGetOwners extends IQQuery {

    constructor(id: string) {
        super(id, GET_OWNERS_METHOD);
    }

    public result(owners: DeviceOwner[]): ResultGetOwners {
        return new ResultGetOwners(this.id, owners);
    }
}

export class ResultGetOwners extends IQResult {
    public owners: DeviceOwner[];

    constructor(id: string, owners: DeviceOwner[]) {
        super(id, GET_OWNERS_METHOD);
        this.owners = owners;
    }
}
