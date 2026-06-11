import { FormatType } from './urn/FormatType';

export class FormatDefinition {
  type: FormatType;

  description: Map<string, string> = new Map<string, string>();

  constructor(type: FormatType, description: Map<string, string>) {
    this.type = type;
    this.description = description;
  }
}
