import {LocalizedName} from "../../typedef/name/LocalizedName";
import {DescriptionCodec} from "@openxiot/xiot-core-spec-ts";

export class LocalizedNameCodec {

    static decode(x: any): LocalizedName {
        return new LocalizedName(DescriptionCodec.decode(x))
    }

    static decodeArray(array: any[]): LocalizedName[] {
        return array.map(x => LocalizedNameCodec.decode(x));
    }

    static encode(x: LocalizedName): any {
        return DescriptionCodec.encode(x.value);
    }

    static encodeArray(list: LocalizedName[]): any[] {
        return list.map(x => LocalizedNameCodec.encode(x));
    }
}