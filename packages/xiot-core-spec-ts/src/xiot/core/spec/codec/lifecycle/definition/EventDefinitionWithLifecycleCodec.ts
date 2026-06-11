import {EventDefinition} from '../../../typedef/definition/EventDefinition';
import {ObjectWithLifecycle} from '../../../typedef/lifecycle/ObjectWithLifecycle';
import {EventDefinitionCodec} from '../../definition/EventDefinitionCodec';
import {LifeCycle, LifeCycleFromString} from '../../../typedef/lifecycle/Lifecycle';

export class EventDefinitionWithLifecycleCodec {
  static encode(obj: ObjectWithLifecycle<EventDefinition>) {
    return {
      lifecycle: obj.lifecycle.toString(),
      definition: EventDefinitionCodec.encode(obj.value)
    };
  }

  static encodeArray(resource: ObjectWithLifecycle<EventDefinition>[]) {
    const arr: any[] = [];
    resource.forEach(item => {
      arr.push(this.encode(item));
    });
    return arr;
  }

  static decode(o: any): ObjectWithLifecycle<EventDefinition> {
    const lifecycle: LifeCycle = LifeCycleFromString(o.lifecycle || '');
    const definition: any = o.definition;
    return new ObjectWithLifecycle<EventDefinition>(lifecycle, EventDefinitionCodec.decode(definition));
  }

  static decodeArray(arr: any[]): ObjectWithLifecycle<EventDefinition>[] {
    const list: ObjectWithLifecycle<EventDefinition>[] = [];
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
