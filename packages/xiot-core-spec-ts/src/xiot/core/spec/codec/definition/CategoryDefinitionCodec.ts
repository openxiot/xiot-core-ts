import { DescriptionCodec } from './DescriptionCodec';
import {CategoryDefinition} from '../../typedef/definition/CategoryDefinition';
import {Spec} from '../../typedef/constant/Spec';


export class CategoryDefinitionCodec {
  static decodeArray(list: any[]): CategoryDefinition[] {
    const array: CategoryDefinition[] = [];

    list.forEach(o => {
      array.push(CategoryDefinitionCodec.decode(o));
    });

    return array;
  }

  static decode(o: any): CategoryDefinition {
    const name = o[Spec.NAME];
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    return new CategoryDefinition(name, description);
  }

  static encode(def: CategoryDefinition): any {
    return {
      name: def.name,
      description: DescriptionCodec.encode(def.description)
    };
  }

  static encodeArray(list: CategoryDefinition[]): any[] {
    return list.map(x => {
      return CategoryDefinitionCodec.encode(x);
    });
  }
}
