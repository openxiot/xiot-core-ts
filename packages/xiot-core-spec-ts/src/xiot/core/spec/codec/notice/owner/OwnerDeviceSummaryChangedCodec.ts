import {OwnerDeviceSummaryChanged} from '../../../typedef/notice/owner/impl/OwnerDeviceSummaryChanged';
import {SummaryCodec} from '../../summary/SummaryCodec';

export class OwnerDeviceSummaryChangedCodec {
    static encode(x: OwnerDeviceSummaryChanged): any {
        return {
            timestamp: x.timestamp,
            appId: x.appId,
            ownerId: x.ownerId,
            did: x.did,
            summary: SummaryCodec.encodeObject(x.summary)
        };
    }

    static decode(x: any): OwnerDeviceSummaryChanged {
        const appId = x["appId"] || "";
        const ownerId = x["ownerId"] || "";
        const userId = x["userId"] || "";
        const did = x["did"];
        const summary = x["summary"];
        const timestamp = x["timestamp"] || 0;
        return new OwnerDeviceSummaryChanged(
            timestamp,
            appId,
            ownerId,
            userId,
            did,
            SummaryCodec.decodeObject(summary)
        );
    }
}
