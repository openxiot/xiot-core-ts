import {OwnerDeviceSomewhereChanged} from '../../../typedef/notice/owner/impl/OwnerDeviceSomewhereChanged';
import {SomewhereCodec} from "../../somewhere/SomewhereCodec";

export class OwnerDeviceSomewhereChangedCodec {
    static encode(x: OwnerDeviceSomewhereChanged): any {
        return {
            timestamp: x.timestamp,
            appId: x.appId,
            ownerId: x.ownerId,
            did: x.did,
            somewhere: SomewhereCodec.encodeObject(x.somewhere)
        };
    }

    static decode(x: any): OwnerDeviceSomewhereChanged {
        const appId = x["appId"] || "";
        const ownerId = x["ownerId"] || "";
        const userId = x["userId"] || "";
        const did = x["did"];
        const somewhere = x["somewhere"];
        const timestamp = x["timestamp"] || 0;
        return new OwnerDeviceSomewhereChanged(
            timestamp,
            appId,
            ownerId,
            userId,
            did,
            SomewhereCodec.decodeObject(somewhere)
        );
    }
}
