import {OwnerNotice} from '../../OwnerNotice';
import {OwnerNoticeType} from '../../OwnerNoticeType';
import {Space} from "../../../../space/Space";

export class OwnerSpaceChanged extends OwnerNotice {

    space: Space;

    constructor(timestamp: number, appId: string, ownerId: string, userId: string, space: Space) {
        super(timestamp, appId, ownerId, userId);
        this.space = space;
    }

    subType(): string {
        return OwnerNoticeType.SPACE_CHANGED.toString();
    }
}
