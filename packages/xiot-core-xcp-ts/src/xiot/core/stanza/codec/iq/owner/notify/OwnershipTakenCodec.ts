import {IQCodec} from '../../../IQCodec';
import {IQQuery} from '../../../../typedef/iq/IQQuery';
import {IQResult} from '../../../../typedef/iq/IQResult';
import {QueryOwnershipTaken, ResultOwnershipTaken} from '../../../../typedef/iq/owner/notify/OwnershipTaken';
import {DeviceOwnerCodec} from "@gkct/xiot-core-spec-ts";

export class OwnershipTakenCodec implements IQCodec {
    encodeQueryContent(query: IQQuery): any | null {
        if (query instanceof QueryOwnershipTaken) {
            return {
                owner: DeviceOwnerCodec.encode(query.owner)
            };
        }
    }

    encodeResultContent(result: IQResult): any | null {
        return null;
    }

    decodeQuery(id: string, content: any): IQQuery {
        return new QueryOwnershipTaken(id, DeviceOwnerCodec.encode(content.owner));
    }

    decodeResult(id: string, content: any): IQResult {
        return new ResultOwnershipTaken(id);
    }
}
