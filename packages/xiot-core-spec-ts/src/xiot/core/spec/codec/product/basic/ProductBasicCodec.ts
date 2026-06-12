import {ProductBasic} from "../../../typedef/product/basic/ProductBasic";
import {DeviceType} from '../../../typedef/definition/urn/DeviceType';
import {CreatorCodec} from "../../by/CreatorCodec";
import {UpdaterCodec} from "../../by/UpdaterCodec";
import {LifeCycleFromString} from "../../../typedef/lifecycle/Lifecycle";

export class ProductBasicCodec {
  static decode(x: any): ProductBasic {
    return new ProductBasic(
      x.id,
      x.organization,
      x.model,
      DeviceType.parse(x.template),
      x.name,
      x.icon,
      x.upgrade,
      x.protocol,
      LifeCycleFromString(x.lifecycle),
      x.naming,
      CreatorCodec.decode(x.creator),
      UpdaterCodec.decode(x.updater),
    );
  }

  static encode(x: ProductBasic): any {
    let o: any = {
      organization: x.organization,
      model: x.model,
      template: x.template.toString(),
      icon: x.icon,
      name: x.name,
      upgrade: x.upgrade,
      protocol: x.protocol,
      lifecycle: x.lifecycle.toString(),
      naming: x.naming
    };

    if (x.id > 0) {
      o.id = x.id;
    }

    if (x.creator) {
      o.creator = CreatorCodec.encode(x.creator);
    }

    if (x.updater) {
      o.updater = UpdaterCodec.encode(x.updater);
    }

    return o;
  }

  static decodeArray(arr: any[]): ProductBasic[] {
    const list: ProductBasic[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.decode(o));
      }
    }
    return list;
  }

  static encodeArray(products: ProductBasic[]): any[] {
    const arr: any[] = [];
    if (products?.length) {
      for (const p of products) {
        arr.push(this.encode(p));
      }
    }
    return arr;
  }
}
