import { UnitType } from './urn/UnitType';

export class UnitDefinition {
  type: UnitType;

  description: Map<string, string> = new Map<string, string>();

  constructor(type: UnitType, description: Map<string, string>) {
    this.type = type;
    this.description = description;
  }
}
