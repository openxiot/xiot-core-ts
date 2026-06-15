import {NamespaceDefinition} from '../../typedef/definition/NamespaceDefinition';
import {Spec} from '../../typedef/constant/Spec';
import {DescriptionCodec} from './DescriptionCodec';
import {Visibility, VisibilityFromString} from "../../typedef/visibility/Visibility";

export class NamespaceDefinitionCodec {
  static decodeArray(list: any[]): NamespaceDefinition[] {
    const array: NamespaceDefinition[] = [];

    list.forEach(o => {
      array.push(NamespaceDefinitionCodec.decode(o));
    });

    return array;
  }

  static decode(o: any): NamespaceDefinition {
    const organization = o.organization || '';
    const visibility = o[Spec.VISIBILITY] || '';
    const namespace = o[Spec.NAMESPACE];
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const def = new NamespaceDefinition(namespace, description);
    def.visibility = VisibilityFromString(visibility);
    def.organization = organization;
    return def;
  }

  static encode(def: NamespaceDefinition): any {
    let o: any = {
      namespace: def.namespace,
      description: DescriptionCodec.encode(def.description),
      organization: def.organization
    };

    if (def.visibility !== Visibility.UNDEFINED) {
      o[Spec.VISIBILITY] = def.visibility;
    }

    return o;
  }

  static encodeArray(list: NamespaceDefinition[]): any[] {
    return list.map(x => {
      return NamespaceDefinitionCodec.encode(x);
    });
  }
}
