export class Space {

    id: string = '';
    name: string = '';
    rootId: string | null = null;
    parentId: string | null = null;
    index: number = 0;

    constructor(id: string) {
        this.id = id;
    }

    public isRoot(): boolean {
        if (this.rootId !== null) {
            return this.rootId === this.id;
        }

        return this.parentId === null;
    }
}
