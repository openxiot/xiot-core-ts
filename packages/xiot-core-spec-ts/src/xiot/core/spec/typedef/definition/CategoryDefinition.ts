export class CategoryDefinition {

  name = '';
  description: Map<string, string> = new Map<string, string>();

  constructor(name: string, description: Map<string, string>) {
    this.name = name;
    this.description = description;
  }
}
