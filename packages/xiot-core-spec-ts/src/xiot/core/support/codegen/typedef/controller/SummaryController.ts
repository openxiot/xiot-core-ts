import {Summary} from "../../../../spec/typedef/summary/Summary";

export class SummaryController extends Summary {

    private listener!: ((value: Summary) => void);

    constructor(summary: Summary) {
        super()
        this.type = summary.type;
        this.online = summary.online;
        this.cloudId = summary.cloudId;
        this.parentId = summary.parentId;
        this.rootId = summary.rootId;
        this.protocol = summary.protocol;
        this.members = summary.members;
        this.lastOnline = summary.lastOnline;
    }

    setListener(listener: ((value: Summary) => void)): void {
        this.listener = listener;
    }

    update(summary: Summary): boolean {
        let changed = false;

        if (this.changeType(summary.type)) {
            changed = true;
        }

        if (this.changeOnline(summary.online)) {
            changed = true;
        }

        if (this.changeCloudId(summary.cloudId)) {
            changed = true;
        }

        if (this.changeParentId(summary.parentId)) {
            changed = true;
        }

        if (this.changeRootId(summary.rootId)) {
            changed = true;
        }

        if (this.changeProtocol(summary.protocol)) {
            changed = true;
        }

        if (this.changeMembers(summary.members)) {
            changed = true;
        }

        if (this.changeLastOnline(summary.lastOnline)) {
            changed = true;
        }

        if (this.changeLastOffline(summary.lastOffline)) {
            changed = true;
        }

        if (this.listener !== undefined) {
            this.listener(this);
        }

        return changed;
    }
}
