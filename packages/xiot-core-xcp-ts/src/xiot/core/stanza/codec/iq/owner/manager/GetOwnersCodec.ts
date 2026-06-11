import {IQCodec} from '../../../IQCodec';
import {IQQuery} from '../../../../typedef/iq/IQQuery';
import {IQResult} from '../../../../typedef/iq/IQResult';
import {QueryGetOwners, ResultGetOwners} from '../../../../typedef/iq/owner/manager/GetOwners';
import {DeviceOwnerCodec} from "@openxiot/xiot-core-spec-ts";

export class GetOwnersCodec implements IQCodec {
    encodeQueryContent(query: IQQuery): any | null {
        return null;
    }

    encodeResultContent(result: IQResult): any | null {
        if (result instanceof ResultGetOwners) {
            return {owners: DeviceOwnerCodec.encodeArray(result.owners)};
        }

        return null;
    }

    decodeQuery(id: string, content: any): IQQuery {
        return new QueryGetOwners(id);
    }

    decodeResult(id: string, content: any): IQResult {
        return new ResultGetOwners(id, DeviceOwnerCodec.decodeArray(content.owners));
    }
}
