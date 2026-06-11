import {LifeCycle, LifeCycleFromString} from '../../../typedef/lifecycle/Lifecycle';
import {ObjectWithLifecycle} from '../../../typedef/lifecycle/ObjectWithLifecycle';

export class VersionWithLifecycleCodec {
  static encode(o: ObjectWithLifecycle<Number>) {
    return {
      lifecycle: o.lifecycle.toString(),
      version: o.value
    };
  }

  static encodeArray(resource: ObjectWithLifecycle<Number>[]) {
    const arr: any[] = [];
    resource.forEach(item => {
      arr.push(this.encode(item));
    });
    return arr;
  }

  static decode(o: any): ObjectWithLifecycle<Number> {
    const lifecycle: LifeCycle = LifeCycleFromString(o.lifecycle || '');
    const version: any = o.version;
    if (typeof version === 'number') {
      return  new ObjectWithLifecycle<Number>(lifecycle, version);
    } else {
      return  new ObjectWithLifecycle<Number>(lifecycle, 0);
    }
  }

  static decodeArray(arr: any[]): ObjectWithLifecycle<Number>[] {
    const list: ObjectWithLifecycle<Number>[] = [];
    if (arr?.length) {
      for (const o of arr) {
        if (typeof o === 'object') {
          list.push(this.decode(o));
        }
      }
    }
    return list;
  }
}
