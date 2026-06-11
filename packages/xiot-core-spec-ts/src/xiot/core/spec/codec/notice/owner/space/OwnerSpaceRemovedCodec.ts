import {OwnerSpaceRemoved} from "../../../../typedef/notice/owner/impl/space/OwnerSpaceRemoved";

export class OwnerSpaceRemovedCodec {

    public static encode(x: OwnerSpaceRemoved): any {
        return {
            appId: x.appId,
            ownerId: x.ownerId,
            spaceId: x.spaceId,
            timestamp: x.timestamp
        };
    }

    public static decode(x: any): OwnerSpaceRemoved {
        const appId = x["appId"] || "";
        const ownerId = x["ownerId"] || "";
        const userId = x["userId"] || "";
        const spaceId = x["spaceId"];
        const timestamp = x["timestamp"] || 0;
        return new OwnerSpaceRemoved(timestamp, appId, ownerId, userId, spaceId);
    }
}
