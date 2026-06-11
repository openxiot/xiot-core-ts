import {ProductVersion} from '../../typedef/product/ProductVersion';
import {DeviceType} from '../../typedef/definition/urn/DeviceType';
import {DeviceInstanceCodec} from "../instance/DeviceInstanceCodec";
import {LifeCycleFromString} from "../../typedef/lifecycle/Lifecycle";

export class ProductVersionCodec {

  static encode(x: ProductVersion): any {
    let o: any = {
      lifecycle: x.lifecycle.toString(),
      version: x.version,
      productId: x.productId,
      type: x.type.toString(),
      ltpk: x.ltpk,
      ltsk: x.ltsk,
      seed: x.seed,
    };

    if (x.instance) {
      o['instance'] = DeviceInstanceCodec.encode(x.instance);
    }

    if (x.createAt !== undefined) {
      o.createAt = x.createAt.getTime();
    }

    if (x.updateAt !== undefined) {
      o.updateAt = x.updateAt.getTime();
    }

    return o;
  }

  static decode(o: any): ProductVersion {
    const version: ProductVersion = new ProductVersion();
    version.lifecycle = LifeCycleFromString(o.lifecycle || '');
    version.version = o.version;
    version.productId = o.productId;
    version.type = DeviceType.parse(o.type);
    version.ltpk = o.ltpk;
    version.ltsk = o.ltsk;
    version.seed = o.seed;

    if (o.instance) {
      version.instance = DeviceInstanceCodec.decode(o.instance);
    }

    if (o.createAt !== undefined) {
      version.createAt = new Date(o.createAt);
    }

    if (o.updateAt !== undefined) {
      version.updateAt = new Date(o.updateAt);
    }

    return version;
  }

  static encodeArray(arr: ProductVersion[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): ProductVersion[] {
    const instances: ProductVersion[] = [];
    if (arr?.length) {
      for (const o of arr) {
        instances.push(this.decode(o));
      }
    }
    return instances;
  }
}
