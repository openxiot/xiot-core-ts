import {Product} from '../../typedef/product/Product';
import {DeviceType} from '../../typedef/definition/urn/DeviceType';
import {VersionWithLifecycleCodec} from "../lifecycle/product/VersionWithLifecycleCodec";

export class ProductCodec {
  static decode(o: any): Product {
    const x = new Product();
    x.id = o.id;
    x.name = o.name;
    x.icon = o.icon;
    x.model = o.model;
    x.template = new DeviceType(o.template);
    x.organization = o.organization;
    x.key = o.key;
    x.cert = o.cert;
    x.protocol = o.protocol;
    x.createBy = o.createBy;
    x.createAt = o.createAt;
    x.updateBy = o.updateBy;
    x.updateAt = o.updateAt;

    if (o.versions && o.versions instanceof Array) {
      x.versions = VersionWithLifecycleCodec.decodeArray(o.versions);
    }

    if (o.createAt !== undefined) {
      x.createAt = new Date(o.createAt);
    }

    if (o.updateAt !== undefined) {
      x.updateAt = new Date(o.updateAt);
    }

    return x;
  }

  static encode(x: Product): any {
    let o: any = {
      id: x.id,
      name: x.name,
      icon: x.icon,
      model: x.model,
      template: x.template.toString(),
      organization: x.organization,
      key: x.key,
      cert: x.cert,
      protocol: x.protocol,
      createBy: x.createBy,
      updateBy: x.updateBy,
      versions: VersionWithLifecycleCodec.encodeArray(x.versions),
    };

    if (x.createAt !== undefined) {
      o.createAt = x.createAt.getTime();
    }

    if (x.updateAt !== undefined) {
      o.updateAt = x.updateAt.getTime();
    }

    return o;
  }

  static decodeArray(arr: any[]): Product[] {
    const list: Product[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.decode(o));
      }
    }
    return list;
  }

  static encodeArray(products: Product[]): any[] {
    const arr: any[] = [];
    if (products?.length) {
      for (const p of products) {
        arr.push(this.encode(p));
      }
    }
    return arr;
  }
}
