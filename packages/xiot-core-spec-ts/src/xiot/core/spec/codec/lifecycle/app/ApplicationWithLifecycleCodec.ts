import {Application} from '../../../typedef/app/Application';
import {ObjectWithLifecycle} from '../../../typedef/lifecycle/ObjectWithLifecycle';
import {ApplicationCodec} from '../../app/ApplicationCodec';
import {LifeCycle, LifeCycleFromString} from '../../../typedef/lifecycle/Lifecycle';


export class ApplicationWithLifecycleCodec {
  static encode(obj: ObjectWithLifecycle<Application>) {
    return {
      lifecycle: obj.lifecycle.toString(),
      application: ApplicationCodec.encode(obj.value)
    };
  }

  static encodeArray(resource: ObjectWithLifecycle<Application>[]) {
    const arr: any[] = [];
    resource.forEach(item => {
      arr.push(this.encode(item));
    });
    return arr;
  }

  static decode(o: any): ObjectWithLifecycle<Application> {
    const lifecycle: LifeCycle = LifeCycleFromString(o.lifecycle || '');
    const application: any = o.application;
    return new ObjectWithLifecycle<Application>(lifecycle, ApplicationCodec.decode(application));
  }

  static decodeArray(arr: any[]): ObjectWithLifecycle<Application>[] {
    const list: ObjectWithLifecycle<Application>[] = [];
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
