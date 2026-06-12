import {GenericVersion} from "../../typedef/version/GenericVersion";

export class GenericVersionCodec {

    static encode(x: GenericVersion): any {
        return {
          name: x.name,
          code: x.code
        };
    }

    static decode(o: any): GenericVersion {
        return new GenericVersion(
          o.name || '',
          o.code || 0,
        );
    }
}
