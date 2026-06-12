import {ProductManual, ProductManualPage} from '../../../typedef/product/manual/ProductManual';
import {LifeCycle, LifeCycleFromString} from "../../../typedef/lifecycle/Lifecycle";
import {CreatorCodec} from "../../by/CreatorCodec";
import {UpdaterCodec} from "../../by/UpdaterCodec";

class ProductManualPageCodec {
  static encode(x: ProductManualPage): any {
    return {
      index: x.index,
      url: x.url
    }
  }

  static decode(x: any): ProductManualPage {
    if (x) {
      return new ProductManualPage(
        x.index || 0,
        x.url || '',
      );
    }

    return new ProductManualPage();
  }

  static encodeArray(arr: ProductManualPage[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): ProductManualPage[] {
    const list: ProductManualPage[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.decode(o));
      }
    }
    return list;
  }
}

export class ProductManualCodec {
  static encode(x: ProductManual): any {
    let o: any = {
      pages: ProductManualPageCodec.decodeArray(x.pages),
      lifecycle: x.lifecycle.toString(),
    };

    if (x.creator) {
      o.creator = CreatorCodec.encode(x.creator);
    }

    if (x.updater) {
      o.updater = UpdaterCodec.encode(x.updater);
    }

    return o;
  }

  static decode(x: any): ProductManual {
    if (x) {
      return new ProductManual(
        ProductManualPageCodec.decodeArray(x.pages),
        LifeCycleFromString(x.lifecycle || LifeCycle.DEVELOPMENT),
        CreatorCodec.decode(x.creator),
        UpdaterCodec.decode(x.updater),
      );
    }

    return new ProductManual();
  }

  static encodeArray(arr: ProductManual[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): ProductManual[] {
    const instances: ProductManual[] = [];
    if (arr?.length) {
      for (const o of arr) {
        instances.push(this.decode(o));
      }
    }
    return instances;
  }
}
