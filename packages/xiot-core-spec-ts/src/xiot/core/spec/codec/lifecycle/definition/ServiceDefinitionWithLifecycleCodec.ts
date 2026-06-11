import {LifeCycle, LifeCycleFromString} from '../../../typedef/lifecycle/Lifecycle';
import {ObjectWithLifecycle} from '../../../typedef/lifecycle/ObjectWithLifecycle';
import {ServiceDefinition} from '../../../typedef/definition/ServiceDefinition';
import {ServiceDefinitionCodec} from '../../definition/ServiceDefinitionCodec';

export class ServiceDefinitionWithLifecycleCodec {
  static encode(obj: ObjectWithLifecycle<ServiceDefinition>) {
    return {
      lifecycle: obj.lifecycle.toString(),
      definition: ServiceDefinitionCodec.encode(obj.value)
    };
  }

  static encodeArray(resource: ObjectWithLifecycle<ServiceDefinition>[]) {
    const arr: any[] = [];
    resource.forEach(item => {
      arr.push(this.encode(item));
    });
    return arr;
  }

  static decode(o: any): ObjectWithLifecycle<ServiceDefinition> {
    const lifecycle: LifeCycle = LifeCycleFromString(o.lifecycle || '');
    const definition: any = o.definition;
    return new ObjectWithLifecycle<ServiceDefinition>(lifecycle, ServiceDefinitionCodec.decode(definition));
  }

  static decodeArray(arr: any[]): ObjectWithLifecycle<ServiceDefinition>[] {
    const list: ObjectWithLifecycle<ServiceDefinition>[] = [];
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
