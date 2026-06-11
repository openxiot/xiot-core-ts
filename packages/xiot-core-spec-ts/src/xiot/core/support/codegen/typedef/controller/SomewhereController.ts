import {Somewhere} from "../../../../spec/typedef/somewhere/Somewhere";

export class SomewhereController extends Somewhere {

    private listener!: ((value: Somewhere) => void);

    constructor(somewhere: Somewhere) {
        super()
        this.where = somewhere.where;
        this.spaceId = somewhere.spaceId;
        this.index = somewhere.index;
    }

    setListener(listener: ((value: Somewhere) => void)): void {
        this.listener = listener;
    }

    update(somewhere: Somewhere): boolean {
        let changed = false;

        if (this.changeWhere(somewhere.where)) {
            changed = true;
        }

        if (this.changeIndex(somewhere.index)) {
            changed = true;
        }

        if (this.changeSpaceId(somewhere.spaceId)) {
            changed = true;
        }

        if (this.listener !== undefined) {
            this.listener(this);
        }

        return changed;
    }
}
