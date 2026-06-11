import { PropertyType } from './urn/PropertyType';

export class ArgumentDefinition {
  type: PropertyType;

  minRepeat = 1;

  maxRepeat = 1;

  constructor(type: PropertyType) {
    this.type = type;
  }
}
