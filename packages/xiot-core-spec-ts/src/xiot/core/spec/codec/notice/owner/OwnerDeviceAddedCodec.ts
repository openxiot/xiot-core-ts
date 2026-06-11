import {OwnerDeviceAdded} from '../../../typedef/notice/owner/impl/OwnerDeviceAdded';
import {SummaryCodec} from '../../summary/SummaryCodec';
import {SomewhereCodec} from "../../somewhere/SomewhereCodec";


export class OwnerDeviceAddedCodec {
    static encode(x: OwnerDeviceAdded): any {
        return {
            timestamp: x.timestamp,
            appId: x.appId,
            ownerId: x.ownerId,
            did: x.did,
            summary: SummaryCodec.encodeObject(x.summary),
            somewhere: SomewhereCodec.encodeObject(x.somewhere)
        };
    }

    static decode(o: any): OwnerDeviceAdded {
        const {appId = '', ownerId = '', userId = '', did = '', summary, somewhere} = o;
        return new OwnerDeviceAdded(
            o.timestamp || new Date().getTime(),
            appId,
            ownerId,
            userId,
            did,
            SummaryCodec.decodeObject(summary),
            SomewhereCodec.decodeObject(somewhere)
        );
    }
}
