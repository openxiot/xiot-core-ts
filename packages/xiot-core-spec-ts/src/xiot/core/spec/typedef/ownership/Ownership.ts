
export class Ownership {

    appId = '';
    ownerId = '';
    did = '';
    token = '';
    rootId = '';
    cloudId = '';
    createAt!: Date;
    updateAt!: Date;

    public createAtString(): string {
        if (this.createAt === undefined) {
            return '';
        }

        return `${this.createAt.getFullYear()}-${this.createAt.getMonth() + 1}-${this.createAt.getDate()} ${this.createAt.getHours()}:${this.createAt.getMinutes()}`;
    }

    public updateAtString(): string {
        if (this.updateAt === undefined) {
            return '';
        }

        return `${this.updateAt.getFullYear()}-${this.updateAt.getMonth() + 1}-${this.updateAt.getDate()} ${this.updateAt.getHours()}:${this.updateAt.getMinutes()}`;
    }
}
