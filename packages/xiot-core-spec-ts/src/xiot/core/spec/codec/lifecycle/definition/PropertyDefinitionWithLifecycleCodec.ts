import {LifeCycle, LifeCycleFromString} from '../../../typedef/lifecycle/Lifecycle';
import {ObjectWithLifecycle} from '../../../typedef/lifecycle/ObjectWithLifecycle';
import {PropertyDefinition} from '../../../typedef/definition/PropertyDefinition';
import {PropertyDefinitionCodec} from '../../definition/PropertyDefinitionCodec';

export class PropertyDefinitionWithLifecycleCodec {
  static encode(obj: ObjectWithLifecycle<PropertyDefinition>): any {
    return {
      lifecycle: obj.lifecycle.toString(),
      definition: PropertyDefinitionCodec.encode(obj.value)
    };
  }

  static encodeArray(resource: ObjectWithLifecycle<PropertyDefinition>[]) {
    const arr: any[] = [];
    resource.forEach(item => {
      arr.push(this.encode(item));
    });
    return arr;
  }

  static decode(o: any): ObjectWithLifecycle<PropertyDefinition> {
    const lifecycle: LifeCycle = LifeCycleFromString(o.lifecycle || '');
    const definition: any = o.definition;
    return new ObjectWithLifecycle<PropertyDefinition>(lifecycle, PropertyDefinitionCodec.decode(definition));
  }

  static decodeArray(arr: any[]): ObjectWithLifecycle<PropertyDefinition>[] {
    const list: ObjectWithLifecycle<PropertyDefinition>[] = [];
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
