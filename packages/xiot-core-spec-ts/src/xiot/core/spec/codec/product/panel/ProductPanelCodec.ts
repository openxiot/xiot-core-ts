import {ProductPanel, ProductPanelMiniApp, ProductPanelWeb} from '../../../typedef/product/panel/ProductPanel';
import {LifeCycle, LifeCycleFromString} from "../../../typedef/lifecycle/Lifecycle";
import {GenericVersionCodec} from "../../version/GenericVersionCodec";
import {CreatorCodec} from "../../by/CreatorCodec";
import {UpdaterCodec} from "../../by/UpdaterCodec";
import {GenericVersion} from "../../../typedef/version/GenericVersion";
import {Urn} from "../../../typedef/definition/urn/Urn";
import {UrnType} from "../../../typedef/definition/urn/UrnType";
import {DeviceType} from "../../../typedef/definition/urn/DeviceType";

class ProductPanelWebCodec {
  static encode(x: ProductPanelWeb | null): any {
    if (x) {
      return {
        format: x.format,
        url: x.url
      }
    }

    return null;
  }

  static decode(o: any): ProductPanelWeb | null {
    if (o) {
      return new ProductPanelWeb(o.format || '', o.url || '');
    } else {
      return null;
    }
  }
}

class ProductPanelMiniAppCodec {
  static encode(x: ProductPanelMiniApp | null): any {
    if (x) {
      return {
        appId: x.appId,
      }
    }

    return null;
  }

  static decode(o: any): ProductPanelMiniApp | null {
    if (o) {
      return new ProductPanelMiniApp(o.appId || '');
    } else {
      return null;
    }
  }
}

export class ProductPanelCodec {
  static encode(x: ProductPanel): any {
    let o: any = {
      status: x.status,
      lifecycle: x.lifecycle.toString(),
      category: x.category,
      type: x.type,
      version: GenericVersionCodec.encode(x.version),
      instance: x.instance.toString(),
    };

    if (x.web) {
      o.web = ProductPanelWebCodec.encode(x.web);
    }

    if (x.miniapp) {
      o.miniapp = ProductPanelMiniAppCodec.encode(x.miniapp);
    }

    if (x.creator) {
      o.creator = CreatorCodec.encode(x.creator);
    }

    if (x.updater) {
      o.updater = UpdaterCodec.encode(x.updater);
    }

    return o;
  }

  static decode(o: any): ProductPanel {
    if (o) {
      return new ProductPanel(
        o.status || '',
        LifeCycleFromString(o.lifecycle),
        o.category || 'mobile',
        o.type || 'web',
        ProductPanelWebCodec.decode(o.web),
        ProductPanelMiniAppCodec.decode(o.minapp),
        GenericVersionCodec.decode(o.version),
        DeviceType.parse(o.instance),
        CreatorCodec.decode(o.creator),
        UpdaterCodec.decode(o.updater),
      );
    }

    return new ProductPanel(
      '',
      LifeCycle.DEVELOPMENT,
      '?',
      '?',
      null,
      null,
      new GenericVersion('', 0),
      Urn.create('', UrnType.DEVICE, '', '00000000')
    );
  }

  static encodeArray(arr: ProductPanel[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): ProductPanel[] {
    const instances: ProductPanel[] = [];
    if (arr?.length) {
      for (const o of arr) {
        instances.push(this.decode(o));
      }
    }
    return instances;
  }
}
