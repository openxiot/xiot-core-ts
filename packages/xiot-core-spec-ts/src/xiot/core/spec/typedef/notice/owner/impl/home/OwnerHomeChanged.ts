import {OwnerNotice} from '../../OwnerNotice';
import {OwnerNoticeType} from '../../OwnerNoticeType';
import {Space} from "../../../../space/Space";

export class OwnerHomeChanged extends OwnerNotice {

    home: Space;

    constructor(timestamp: number, appId: string, ownerId: string, userId: string, home: Space) {
        super(timestamp, appId, ownerId, userId);
        this.home = home;
    }

    subType(): string {
        return OwnerNoticeType.HOME_CHANGED.toString();
    }
}
