import {ProductResource} from "../../../typedef/product/resource/ProductResource";
import {ResourceVersionCodec} from "./ResourceVersionCodec";
import {DescriptionCodec} from "../../definition/DescriptionCodec";

export class ProductResourceCodec {

  static encode(x: ProductResource): any {
    return {
      productId: x.productId,
      name: x.name,
      description: DescriptionCodec.encode(x.description),
      extra: x.extra,
      versions: ResourceVersionCodec.encodeArray(x.versions)
    };
  }

  static decode(o: any): ProductResource {
    const x: ProductResource = new ProductResource();
    x.productId = o.productId;
    x.name = o.name;
    x.description = DescriptionCodec.decode(o.description);
    x.extra = o.extra;
    x.versions = ResourceVersionCodec.decodeArray(o.versions);
    return x;
  }

  static encodeArray(arr: ProductResource[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): ProductResource[] {
    const instances: ProductResource[] = [];
    if (arr?.length) {
      for (const o of arr) {
        instances.push(this.decode(o));
      }
    }
    return instances;
  }
}
