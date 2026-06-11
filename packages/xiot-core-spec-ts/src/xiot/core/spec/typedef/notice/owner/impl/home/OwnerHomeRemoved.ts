import {OwnerNotice} from '../../OwnerNotice';
import {OwnerNoticeType} from '../../OwnerNoticeType';

export class OwnerHomeRemoved extends OwnerNotice {

    homeId: string;

    constructor(timestamp: number, appId: string, ownerId: string, userId: string, homeId: string) {
        super(timestamp, appId, ownerId, userId);
        this.homeId = homeId;
    }

    subType(): string {
        return OwnerNoticeType.HOME_REMOVED.toString();
    }
}
