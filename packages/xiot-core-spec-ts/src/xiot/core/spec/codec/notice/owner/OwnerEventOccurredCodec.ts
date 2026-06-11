import {OwnerEventOccurred} from '../../../typedef/notice/owner/impl/OwnerEventOccurred';
import {EventOperationCodec} from '../../operation/EventOperationCodec';

export class OwnerEventOccurredCodec {
    static encode(x: OwnerEventOccurred): any {
        return {
            event: EventOperationCodec.Query.encodeObject(x.event),
            timestamp: x.timestamp,
            appId: x.appId,
            ownerId: x.ownerId
        };
    }

    static decode(o: any): OwnerEventOccurred {
        const e = EventOperationCodec.Query.decodeObject(o.event);
        return new OwnerEventOccurred(
            o.timestamp || new Date().getTime(),
            o.appId || '',
            o.ownerId || '',
            o.userId || '',
            e);
    }
}
