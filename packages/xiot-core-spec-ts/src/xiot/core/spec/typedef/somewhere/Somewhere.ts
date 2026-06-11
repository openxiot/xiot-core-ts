import {Where} from "./Where";

export class Somewhere {

    where: Where = Where.UNKNOWN;
    spaceId: string = '';
    index: number = 0;

    local(): boolean {
        if (this.where != null) {
            return this.where == Where.LOCAL || this.where == Where.LOCAL_AND_CLOUD;
        }

        return false;
    }

    cloud(): boolean {
        if (this.where != null) {
            return this.where == Where.CLOUD || this.where == Where.LOCAL_AND_CLOUD;
        }

        return false;
    }

    protected changeWhere(where: Where): boolean {
        if (this.where === where) {
            return false;
        }

        this.where = where;
        return true;
    }

    protected changeSpaceId(spaceId: string): boolean {
        if (this.spaceId === spaceId) {
            return false;
        }

        this.spaceId = spaceId;
        return true;
    }

    protected changeIndex(index: number): boolean {
        if (this.index === index) {
            return false;
        }

        this.index = index;
        return true;
    }
}
