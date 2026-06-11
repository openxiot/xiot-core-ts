import {Space} from "../../typedef/space/Space";

export class SpaceCodec {

    static decodeArray(list: any[]): Space[] {
        const array = [];

        if (list != null) {
            for (const o of list) {
                array.push(SpaceCodec.decodeObject(o));
            }
        }

        return array;
    }

    static decodeObject(o: any): Space {
        const x = new Space(o['id'] || '');
        x.name = o['name'] || '';
        x.rootId = o['rootId'] || null;
        x.parentId = o['parentId'] || null;
        x.index = o['index'] || 0
        return x;
    }

    static encodeObject(s: Space): any {
        const o: any = {
            id: s.id,
            name: s.name,
            index: s.index
        };

        if (s.rootId !== null) {
            o['rootId'] = s.rootId;
        }

        if (s.parentId !== null) {
            o['parentId'] = s.parentId;
        }

        return o;
    }

    static encodeArray(array: Array<Space>): any[] {
        return array != null
            ? array.map(s => {
                return SpaceCodec.encodeObject(s);
            })
            : [];
    }
}
