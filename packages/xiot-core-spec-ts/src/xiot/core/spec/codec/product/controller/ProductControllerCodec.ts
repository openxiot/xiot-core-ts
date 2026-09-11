import {ProductController, ProductControllerWeb} from "../../../typedef/product/controller/ProductController";
import {LifeCycle, LifeCycleFromString} from "../../../typedef/lifecycle/Lifecycle";
import {GenericVersionCodec} from "../../version/GenericVersionCodec";
import {CreatorCodec} from "../../by/CreatorCodec";
import {UpdaterCodec} from "../../by/UpdaterCodec";
import {GenericVersion} from "../../../typedef/version/GenericVersion";
import {Urn} from "../../../typedef/definition/urn/Urn";
import {UrnType} from "../../../typedef/definition/urn/UrnType";
import {DeviceType} from "../../../typedef/definition/urn/DeviceType";

class ProductControllerWebCodec {
  static encode(x: ProductControllerWeb | null): any {
    if (x) {
      return {
        format: x.format,
        url: x.url
      }
    }

    return null;
  }

  static decode(o: any): ProductControllerWeb | null {
    if (o) {
      return new ProductControllerWeb(o.format || '', o.url || '');
    } else {
      return null;
    }
  }
}

export class ProductControllerCodec {
  static encode(x: ProductController): any {
    let o: any = {
      lifecycle: x.lifecycle.toString(),
      category: x.category,
      version: GenericVersionCodec.encode(x.version),
      instance: x.instance.toString(),
    };

    if (x.type) {
      o.type = x.type;
    }

    if (x.web) {
      o.web = ProductControllerWebCodec.encode(x.web);
    }

    if (x.creator) {
      o.creator = CreatorCodec.encode(x.creator);
    }

    if (x.updater) {
      o.updater = UpdaterCodec.encode(x.updater);
    }

    return o;
  }

  static decode(o: any): ProductController {
    if (o) {
      return new ProductController(
        LifeCycleFromString(o.lifecycle),
        o.category || '',
        o.type || '',
        ProductControllerWebCodec.decode(o.web),
        GenericVersionCodec.decode(o.version),
        DeviceType.parse(o.instance),
        CreatorCodec.decode(o.creator),
        UpdaterCodec.decode(o.updater),
      );
    }

    return new ProductController(
      LifeCycle.DEVELOPMENT,
      '?',
      '?',
      null,
      new GenericVersion('', 0),
      Urn.create('', UrnType.DEVICE, '', '00000000')
    );
  }

  static encodeArray(arr: ProductController[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): ProductController[] {
    const instances: ProductController[] = [];
    if (arr?.length) {
      for (const o of arr) {
        instances.push(this.decode(o));
      }
    }
    return instances;
  }
}
