import {ActionDefinition} from '../../../typedef/definition/ActionDefinition';
import {ObjectWithLifecycle} from '../../../typedef/lifecycle/ObjectWithLifecycle';
import {ActionDefinitionCodec} from '../../definition/ActionDefinitionCodec';
import {LifeCycle, LifeCycleFromString} from '../../../typedef/lifecycle/Lifecycle';

export class ActionDefinitionWithLifecycleCodec {
  static encode(obj: ObjectWithLifecycle<ActionDefinition>) {
    return {
      lifecycle: obj.lifecycle.toString(),
      definition: ActionDefinitionCodec.encode(obj.value)
    };
  }

  static encodeArray(resource: ObjectWithLifecycle<ActionDefinition>[]) {
    const arr: any[] = [];
    resource.forEach(item => {
      arr.push(this.encode(item));
    });
    return arr;
  }

  static decode(o: any): ObjectWithLifecycle<ActionDefinition> {
    const lifecycle: LifeCycle = LifeCycleFromString(o.lifecycle || '');
    const definition: any = o.definition;
    return new ObjectWithLifecycle<ActionDefinition>(lifecycle, ActionDefinitionCodec.decode(definition));
  }

  static decodeArray(arr: any[]): ObjectWithLifecycle<ActionDefinition>[] {
    const list: ObjectWithLifecycle<ActionDefinition>[] = [];
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
