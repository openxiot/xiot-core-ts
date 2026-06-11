import {OwnerNotice} from '../../OwnerNotice';
import {OwnerNoticeType} from '../../OwnerNoticeType';

export class OwnerSpaceRemoved extends OwnerNotice {

    spaceId: string;

    constructor(timestamp: number, appId: string, ownerId: string, userId: string, spaceId: string) {
        super(timestamp, appId, ownerId, userId);
        this.spaceId = spaceId;
    }

    subType(): string {
        return OwnerNoticeType.SPACE_REMOVED.toString();
    }
}
