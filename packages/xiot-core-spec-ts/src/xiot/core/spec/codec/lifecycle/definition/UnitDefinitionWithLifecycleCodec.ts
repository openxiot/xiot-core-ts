import {LifeCycle, LifeCycleFromString} from '../../../typedef/lifecycle/Lifecycle';
import {ObjectWithLifecycle} from '../../../typedef/lifecycle/ObjectWithLifecycle';
import {UnitDefinition} from '../../../typedef/definition/UnitDefinition';
import {UnitDefinitionCodec} from '../../definition/UnitDefinitionCodec';

export class UnitDefinitionWithLifecycleCodec {
  static encode(obj: ObjectWithLifecycle<UnitDefinition>) {
    return {
      lifecycle: obj.lifecycle.toString(),
      definition: UnitDefinitionCodec.encode(obj.value)
    };
  }

  static encodeArray(resource: ObjectWithLifecycle<UnitDefinition>[]) {
    const arr: any[] = [];
    resource.forEach(item => {
      arr.push(this.encode(item));
    });
    return arr;
  }

  static decode(o: any): ObjectWithLifecycle<UnitDefinition> {
    const lifecycle: LifeCycle = LifeCycleFromString(o.lifecycle || '');
    const definition: any = o.definition;
    return new ObjectWithLifecycle<UnitDefinition>(lifecycle, UnitDefinitionCodec.decode(definition));
  }

  static decodeArray(arr: any[]): ObjectWithLifecycle<UnitDefinition>[] {
    const list: ObjectWithLifecycle<UnitDefinition>[] = [];
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
