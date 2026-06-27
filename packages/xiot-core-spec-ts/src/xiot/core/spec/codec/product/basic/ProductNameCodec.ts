import {LocalizedNameCodec} from "../../name/LocalizedNameCodec";
import {ProductName} from "../../../typedef/product/basic/ProductName";

export class ProductNameCodec {

    static decode(x: any): ProductName {
        const original = LocalizedNameCodec.decode(x.original || null);
        const candidate = LocalizedNameCodec.decodeArray(x.candidate || []);
        return new ProductName(original, candidate);
    }

    static encode(x: ProductName): any {
        return {
            original: LocalizedNameCodec.encode(x.original),
            candidate: LocalizedNameCodec.encodeArray(x.candidate),
        };
    }

    static decodeArray(arr: any[]): ProductName[] {
        const list: ProductName[] = [];
        if (arr?.length) {
            for (const o of arr) {
                list.push(this.decode(o));
            }
        }
        return list;
    }

    static encodeArray(products: ProductName[]): any[] {
        const arr: any[] = [];
        if (products?.length) {
            for (const p of products) {
                arr.push(this.encode(p));
            }
        }
        return arr;
    }
}
