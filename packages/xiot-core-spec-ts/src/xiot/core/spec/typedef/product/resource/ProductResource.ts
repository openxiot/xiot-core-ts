import {ResourceVersion} from "./ResourceVersion";

export class ProductResource {

  productId: string = '';

  name: string = '';

  description: Map<string, string> = new Map<string, string>();

  extra: Map<string, any> = new Map<string, any>();

  versions: ResourceVersion[] = [];
}
