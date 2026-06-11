import {IQCodec} from '../../../IQCodec';
import {IQQuery} from '../../../../typedef/iq/IQQuery';
import {IQResult} from '../../../../typedef/iq/IQResult';
import {QueryRemoveOwner, ResultRemoveOwner} from '../../../../typedef/iq/owner/manager/RemoveOwner';
import {DeviceOwnerCodec} from "@gkct/xiot-core-spec-ts";

export class RemoveOwnerCodec implements IQCodec {
    encodeQueryContent(query: IQQuery): any | null {
        if (query instanceof QueryRemoveOwner) {
            return {
                owner: DeviceOwnerCodec.encode(query.owner)
            };
        }
    }

    encodeResultContent(result: IQResult): any | null {
        return null;
    }

    decodeQuery(id: string, content: any): IQQuery {
        return new QueryRemoveOwner(id, DeviceOwnerCodec.encode(content.owner));
    }

    decodeResult(id: string, content: any): IQResult {
        return new ResultRemoveOwner(id);
    }
}
