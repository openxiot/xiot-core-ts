import {OwnerHomeChanged} from "../../../../typedef/notice/owner/impl/home/OwnerHomeChanged";
import {SpaceCodec} from "../../../space/SpaceCodec";

export class OwnerHomeChangedCodec {

    public static encode(x: OwnerHomeChanged): any {
        return {
            appId: x.appId,
            ownerId: x.ownerId,
            home: SpaceCodec.encodeObject(x.home),
            timestamp: x.timestamp
        };
    }

    public static decode(x: any): OwnerHomeChanged {
        const appId = x["appId"] || "";
        const ownerId = x["ownerId"] || "";
        const userId = x["userId"] || "";
        const home = x["home"];
        const timestamp = x["timestamp"] || 0;
        return new OwnerHomeChanged(timestamp, appId, ownerId, userId, SpaceCodec.decodeObject(home));
    }
}
