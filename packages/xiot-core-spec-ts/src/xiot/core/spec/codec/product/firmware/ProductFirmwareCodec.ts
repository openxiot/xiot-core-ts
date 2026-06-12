import {ProductFirmware} from "../../../typedef/product/firmware/ProductFirmware";
import {CreatorCodec} from "../../by/CreatorCodec";
import {UpdaterCodec} from "../../by/UpdaterCodec";

export class ProductFirmwareCodec {

  static encode(x: ProductFirmware): any {
    let o: any = {
      name: x.name,
      description: x.description,
      type: x.type,
    };

    if (x.creator) {
      o.creator = CreatorCodec.encode(x.creator);
    }

    if (x.updater) {
      o.updater = UpdaterCodec.encode(x.updater);
    }

    return o;
  }

  static decode(o: any): ProductFirmware {
    return new ProductFirmware(
      o.name,
      o.description,
      o.type,
      CreatorCodec.decode(o.creator),
      UpdaterCodec.decode(o.updater)
    );
  }

  static encodeArray(arr: ProductFirmware[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): ProductFirmware[] {
    const instances: ProductFirmware[] = [];
    if (arr?.length) {
      for (const o of arr) {
        instances.push(this.decode(o));
      }
    }
    return instances;
  }
}
