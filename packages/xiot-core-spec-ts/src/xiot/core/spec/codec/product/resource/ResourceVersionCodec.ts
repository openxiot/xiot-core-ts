import {ResourceVersion} from "../../../typedef/product/resource/ResourceVersion";
import {LifeCycleFromString} from "../../../typedef/lifecycle/Lifecycle";
import {Version} from "../../../typedef/version/Version";
import {DescriptionCodec} from "../../definition/DescriptionCodec";

export class ResourceVersionCodec {

  static encode(x: ResourceVersion): any {
    let o: any = {
      version: x.version.toString(),
      md5: x.md5,
      description: DescriptionCodec.encode(x.description),
      size: x.size,
      url: x.url,
      lifecycle: x.lifecycle.toString(),
      createBy: x.createBy,
      updateBy: x.updateBy,
    };

    if (x.createAt !== undefined) {
      o.createAt = x.createAt.getTime();
    }

    if (x.updateAt !== undefined) {
      o.updateAt = x.updateAt.getTime();
    }

    return o;
  }

  static decode(o: any): ResourceVersion {
    const version: ResourceVersion = new ResourceVersion();
    version.version = Version.fromString(o.version);
    version.md5 = o.md5;
    version.description = DescriptionCodec.decode(o.description);
    version.size = o.size;
    version.url = o.url;
    version.lifecycle = LifeCycleFromString(o.lifecycle || '');
    version.createBy = o.createBy;
    version.updateBy = o.updateBy;

    if (o.createAt !== undefined) {
      version.createAt = new Date(o.createAt);
    }

    if (o.updateAt !== undefined) {
      version.updateAt = new Date(o.updateAt);
    }

    return version;
  }

  static encodeArray(arr: ResourceVersion[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): ResourceVersion[] {
    const list: ResourceVersion[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.decode(o));
      }
    }
    return list;
  }
}
