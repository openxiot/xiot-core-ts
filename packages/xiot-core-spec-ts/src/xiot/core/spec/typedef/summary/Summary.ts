import {Urn} from '../definition/urn/Urn';

export class Summary {
    type!: Urn;

    online = false;

    cloudId!: string;

    protocol!: string;

    parentId!: string;

    rootId!: string;

    members: string[] = [];

    lastOnline!: Date;

    lastOffline!: Date;

    from(other: Summary): Summary {
        this.type = other.type;
        this.online = other.online;
        this.cloudId = other.cloudId;
        this.parentId = other.parentId;
        this.rootId = other.rootId;
        this.protocol = other.protocol;
        this.members = other.members;
        this.lastOnline = other.lastOnline;
        this.lastOffline = other.lastOffline;
        return this;
    }

    public lastOnlineString(): string {
        if (this.lastOnline === undefined) {
            return '';
        }

        return `${this.lastOnline.getFullYear()}-${this.lastOnline.getMonth() + 1}-${this.lastOnline.getDate()} ${this.lastOnline.getHours()}:${this.lastOnline.getMinutes()}`;
    }

    public lastOfflineString(): string {
        if (this.lastOffline === undefined) {
            return '';
        }

        return `${this.lastOffline.getFullYear()}-${this.lastOffline.getMonth() + 1}-${this.lastOffline.getDate()} ${this.lastOffline.getHours()}:${this.lastOffline.getMinutes()}`;
    }

    protected changeType(type: Urn): boolean {
        if (this.type === type) {
            return false;
        }

        this.type = type;
        return true;
    }

    protected changeOnline(online: boolean): boolean {
        if (this.online === online) {
            return false;
        }

        this.online = online;
        return true;
    }

    protected changeRootId(rootId: string): boolean {
        if (this.rootId === rootId) {
            return false;
        }

        this.rootId = rootId;
        return true;
    }

    protected changeParentId(parentId: string): boolean {
        if (this.parentId === parentId) {
            return false;
        }

        this.parentId = parentId;
        return true;
    }

    protected changeCloudId(cloudId: string): boolean {
        if (this.cloudId === cloudId) {
            return false;
        }

        this.cloudId = cloudId;
        return true;
    }

    protected changeProtocol(protocol: string): boolean {
        if (this.protocol === protocol) {
            return false;
        }

        this.protocol = protocol;
        return true;
    }

    protected changeMembers(members: string[]): boolean {
        let changed = false;

        if (members.length !== this.members.length) {
            this.members = members;
            changed = true;
        } else {
            for (let i = 0; i < this.members.length; i++) {
                if (this.members[i] !== members[i]) {
                    this.members[i] = members[i];
                    changed = true;
                }
            }
        }

        return changed;
    }

    protected changeLastOnline(lastOnline: Date | undefined): boolean {
        if (lastOnline === undefined) {
            return false;
        }

        if (this.lastOnline === undefined) {
            this.lastOnline = lastOnline;
            return true;
        }

        if (this.lastOnline.getTime() === lastOnline.getTime()) {
            return false;
        }

        this.lastOnline = lastOnline;

        return true;
    }

    protected changeLastOffline(lastOffline: Date | undefined): boolean {
        if (lastOffline === undefined) {
            return false;
        }

        if (this.lastOffline === undefined) {
            this.lastOffline = lastOffline;
            return true;
        }

        if (this.lastOffline.getTime() === lastOffline.getTime()) {
            return false;
        }

        this.lastOffline = lastOffline;

        return true;
    }
}
