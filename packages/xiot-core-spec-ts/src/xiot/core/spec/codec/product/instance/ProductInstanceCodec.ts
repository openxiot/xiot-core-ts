import {ProductInstance} from '../../../typedef/product/instance/ProductInstance';
import {LifeCycleFromString} from "../../../typedef/lifecycle/Lifecycle";
import {CreatorCodec} from "../../by/CreatorCodec";
import {UpdaterCodec} from "../../by/UpdaterCodec";
import {DeviceType} from "../../../typedef/definition/urn/DeviceType";

export class ProductInstanceCodec {

  static encode(x: ProductInstance): any {
    let o: any = {
      lifecycle: x.lifecycle.toString(),
      type: x.type?.toString(),
    };

    if (x.creator) {
      o.creator = CreatorCodec.encode(x.creator);
    }

    if (x.updater) {
      o.updater = UpdaterCodec.encode(x.updater);
    }

    return o;
  }

  static decode(o: any): ProductInstance {
    return new ProductInstance(
      LifeCycleFromString(o.lifecycle),
      DeviceType.parse(o.type),
      CreatorCodec.decode(o.creator),
      UpdaterCodec.decode(o.updater),
    );
  }

  static encodeArray(arr: ProductInstance[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): ProductInstance[] {
    const instances: ProductInstance[] = [];
    if (arr?.length) {
      for (const o of arr) {
        instances.push(this.decode(o));
      }
    }
    return instances;
  }
}
