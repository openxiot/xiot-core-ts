import {NamespaceDefinition} from '../../typedef/definition/NamespaceDefinition';
import {Spec} from '../../typedef/constant/Spec';
import {DescriptionCodec} from './DescriptionCodec';

export class NamespaceDefinitionCodec {
  static decodeArray(list: any[]): NamespaceDefinition[] {
    const array: NamespaceDefinition[] = [];

    list.forEach(o => {
      array.push(NamespaceDefinitionCodec.decode(o));
    });

    return array;
  }

  static decode(o: any): NamespaceDefinition {
    const namespace = o[Spec.NAMESPACE];
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    return new NamespaceDefinition(namespace, description);
  }

  static encode(def: NamespaceDefinition): any {
    return {
      namespace: def.namespace,
      description: DescriptionCodec.encode(def.description)
    };
  }

  static encodeArray(list: NamespaceDefinition[]): any[] {
    return list.map(x => {
      return NamespaceDefinitionCodec.encode(x);
    });
  }
}
