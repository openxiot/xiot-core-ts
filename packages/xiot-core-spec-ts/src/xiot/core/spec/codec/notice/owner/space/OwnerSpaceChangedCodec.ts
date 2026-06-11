import {OwnerSpaceChanged} from "../../../../typedef/notice/owner/impl/space/OwnerSpaceChanged";
import {SpaceCodec} from "../../../space/SpaceCodec";

export class OwnerSpaceChangedCodec {

    public static encode(x: OwnerSpaceChanged): any {
        return {
            appId: x.appId,
            ownerId: x.ownerId,
            space: SpaceCodec.encodeObject(x.space),
            timestamp: x.timestamp
        };
    }

    public static decode(x: any): OwnerSpaceChanged {
        const appId = x["appId"] || "";
        const ownerId = x["ownerId"] || "";
        const userId = x["userId"] || "";
        const space = x["space"];
        const timestamp = x["timestamp"] || 0;
        return new OwnerSpaceChanged(timestamp, appId, ownerId, userId, SpaceCodec.decodeObject(space));
    }
}
