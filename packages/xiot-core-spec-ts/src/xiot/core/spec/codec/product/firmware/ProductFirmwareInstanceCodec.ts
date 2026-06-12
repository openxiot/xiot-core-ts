import {FirmwareSample, ProductFirmwareInstance} from "../../../typedef/product/firmware/ProductFirmwareInstance";
import {GenericVersionCodec} from "../../version/GenericVersionCodec";
import {CreatorCodec} from "../../by/CreatorCodec";
import {UpdaterCodec} from "../../by/UpdaterCodec";
import {LifeCycleFromString} from "../../../typedef/lifecycle/Lifecycle";

class FirmwareSampleCodec {
  static encode(x: FirmwareSample): any {
    return {
      memo: x.memo,
      url: x.url,
      size: x.size,
      md5: x.md5,
    };
  }

  static decode(o: any): FirmwareSample {
    return new FirmwareSample(
      o.memo,
      o.url,
      o.size,
      o.md5,
    );
  }
}

export class ProductFirmwareInstanceCodec {
  static encode(x: ProductFirmwareInstance): any {
    let o: any = {
      lifecycle: x.lifecycle.toString(),
      version: GenericVersionCodec.encode(x.version),
      minUpgradeVersionCode: x.minUpgradeVersionCode,
      type: x.type,
    };

    if (x.simple) {
      o.simple = FirmwareSampleCodec.encode(x.simple);
    }

    if (x.creator) {
      o.creator = CreatorCodec.encode(x.creator);
    }

    if (x.updater) {
      o.updater = UpdaterCodec.encode(x.updater);
    }

    return o;
  }

  static decode(o: any): ProductFirmwareInstance {
    return new ProductFirmwareInstance(
      LifeCycleFromString(o.lifecycle),
      GenericVersionCodec.decode(o.version),
      o.minUpgradeVersionCode || 1,
      o.type,
      FirmwareSampleCodec.decode(o.simple),
      CreatorCodec.decode(o.creator),
      UpdaterCodec.decode(o.updater),
    );
  }

  static encodeArray(arr: ProductFirmwareInstance[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): ProductFirmwareInstance[] {
    const instances: ProductFirmwareInstance[] = [];
    if (arr?.length) {
      for (const o of arr) {
        instances.push(this.decode(o));
      }
    }
    return instances;
  }
}
