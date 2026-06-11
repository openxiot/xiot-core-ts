import {OwnerHomeAdded} from "../../../../typedef/notice/owner/impl/home/OwnerHomeAdded";
import {SpaceCodec} from "../../../space/SpaceCodec";

export class OwnerHomeAddedCodec {

    public static encode(x: OwnerHomeAdded): any {
        return {
            appId: x.appId,
            ownerId: x.ownerId,
            home: SpaceCodec.encodeObject(x.home),
            timestamp: x.timestamp
        };
    }

    public static decode(x: any): OwnerHomeAdded {
        const appId = x["appId"] || "";
        const ownerId = x["ownerId"] || "";
        const userId = x["userId"] || "";
        const home = x["home"];
        const timestamp = x["timestamp"] || 0;
        return new OwnerHomeAdded(timestamp, appId, ownerId, userId, SpaceCodec.decodeObject(home));
    }
}
