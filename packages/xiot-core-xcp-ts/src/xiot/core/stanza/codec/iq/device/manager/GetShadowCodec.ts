import {DeviceShadowCodec} from '@gkct/xiot-core-spec-ts';
import {IQCodec} from '../../../IQCodec';
import {IQQuery} from '../../../../typedef/iq/IQQuery';
import {IQResult} from '../../../../typedef/iq/IQResult';
import {QueryGetShadow, ResultGetShadow} from '../../../../typedef/iq/device/manager/GetShadow';

export class GetShadowCodec implements IQCodec {
    encodeQueryContent(query: IQQuery): any | null {
        if (query instanceof QueryGetShadow) {
            return {
                did: query.did
            };
        }
    }

    encodeResultContent(result: IQResult): any | null {
        if (result instanceof ResultGetShadow) {
            return {device: DeviceShadowCodec.encode(result.device)};
        }

        return null;
    }

    decodeQuery(id: string, content: any): IQQuery {
        return new QueryGetShadow(id, content.did);
    }

    decodeResult(id: string, content: any): IQResult {
        return new ResultGetShadow(id, DeviceShadowCodec.decode(content.device));
    }
}
