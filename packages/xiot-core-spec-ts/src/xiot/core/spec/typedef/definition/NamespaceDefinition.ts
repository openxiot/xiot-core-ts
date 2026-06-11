export class NamespaceDefinition {

  namespace = '';
  description: Map<string, string> = new Map<string, string>();

  constructor(namespace: string, description: Map<string, string>) {
    this.namespace = namespace;
    this.description = description;
  }
}
