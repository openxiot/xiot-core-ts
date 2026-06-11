import {IQCodec} from '../../../IQCodec';
import {IQQuery} from '../../../../typedef/iq/IQQuery';
import {IQResult} from '../../../../typedef/iq/IQResult';
import {QueryOwnershipDisclaimed, ResultOwnershipDisclaimed} from '../../../../typedef/iq/owner/notify/OwnershipDisclaimed';
import {DeviceOwnerCodec} from "@openxiot/xiot-core-spec-ts";

export class OwnershipDisclaimedCodec implements IQCodec {
    encodeQueryContent(query: IQQuery): any | null {
        if (query instanceof QueryOwnershipDisclaimed) {
            return {
                owner: DeviceOwnerCodec.encode(query.owner)
            };
        }
    }

    encodeResultContent(result: IQResult): any | null {
        return null;
    }

    decodeQuery(id: string, content: any): IQQuery {
        return new QueryOwnershipDisclaimed(id, DeviceOwnerCodec.encode(content.owner));
    }

    decodeResult(id: string, content: any): IQResult {
        return new ResultOwnershipDisclaimed(id);
    }
}
