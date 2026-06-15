import {Visibility} from "../visibility/Visibility";

export class NamespaceDefinition {

  namespace = '';
  description: Map<string, string> = new Map<string, string>();
  visibility: Visibility = Visibility.UNDEFINED;

  constructor(namespace: string, description: Map<string, string>) {
    this.namespace = namespace;
    this.description = description;
  }
}
