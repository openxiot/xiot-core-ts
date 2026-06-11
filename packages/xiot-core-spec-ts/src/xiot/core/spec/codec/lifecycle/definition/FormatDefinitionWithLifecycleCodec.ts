import {LifeCycle, LifeCycleFromString} from '../../../typedef/lifecycle/Lifecycle';
import {ObjectWithLifecycle} from '../../../typedef/lifecycle/ObjectWithLifecycle';
import {FormatDefinition} from '../../../typedef/definition/FormatDefinition';
import {FormatDefinitionCodec} from '../../definition/FormatDefinitionCodec';

export class FormatDefinitionWithLifecycleCodec {
  static encode(obj: ObjectWithLifecycle<FormatDefinition>) {
    return {
      lifecycle: obj.lifecycle.toString(),
      definition: FormatDefinitionCodec.encode(obj.value)
    };
  }

  static encodeArray(resource: ObjectWithLifecycle<FormatDefinition>[]) {
    const arr: any[] = [];
    resource.forEach(item => {
      arr.push(this.encode(item));
    });
    return arr;
  }

  static decode(o: any): ObjectWithLifecycle<FormatDefinition> {
    const lifecycle: LifeCycle = LifeCycleFromString(o.lifecycle || '');
    const definition: any = o.definition;
    return new ObjectWithLifecycle<FormatDefinition>(lifecycle, FormatDefinitionCodec.decode(definition));
  }

  static decodeArray(arr: any[]): ObjectWithLifecycle<FormatDefinition>[] {
    const list: ObjectWithLifecycle<FormatDefinition>[] = [];
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
