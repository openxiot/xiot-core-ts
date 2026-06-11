import {OwnerHomeRemoved} from "../../../../typedef/notice/owner/impl/home/OwnerHomeRemoved";

export class OwnerHomeRemovedCodec {

    public static encode(x: OwnerHomeRemoved): any {
        return {
            appId: x.appId,
            ownerId: x.ownerId,
            homeId: x.homeId,
            timestamp: x.timestamp
        };
    }

    public static decode(x: any): OwnerHomeRemoved {
        const appId = x["appId"] || "";
        const ownerId = x["ownerId"] || "";
        const userId = x["userId"] || "";
        const homeId = x["homeId"];
        const timestamp = x["timestamp"] || 0;
        return new OwnerHomeRemoved(timestamp, appId, ownerId, userId, homeId);
    }
}
