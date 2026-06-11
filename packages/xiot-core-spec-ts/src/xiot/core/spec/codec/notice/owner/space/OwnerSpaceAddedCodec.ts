import {OwnerSpaceAdded} from "../../../../typedef/notice/owner/impl/space/OwnerSpaceAdded";
import {SpaceCodec} from "../../../space/SpaceCodec";

export class OwnerSpaceAddedCodec {

    public static encode(x: OwnerSpaceAdded): any {
        return {
            appId: x.appId,
            ownerId: x.ownerId,
            space: SpaceCodec.encodeObject(x.space),
            timestamp: x.timestamp
        };
    }

    public static decode(x: any): OwnerSpaceAdded {
        const appId = x["appId"] || "";
        const ownerId = x["ownerId"] || "";
        const userId = x["userId"] || "";
        const space = x["space"];
        const timestamp = x["timestamp"] || 0;
        return new OwnerSpaceAdded(timestamp, appId, ownerId, userId, SpaceCodec.decodeObject(space));
    }
}
