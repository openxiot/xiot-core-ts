import { ActionType } from './urn/ActionType';
import { ArgumentDefinition } from './ArgumentDefinition';

export class ActionDefinition {
  type: ActionType;

  description: Map<string, string> = new Map<string, string>();

  in: ArgumentDefinition[] = [];

  out: ArgumentDefinition[] = [];

  constructor(
    type: ActionType,
    description: Map<string, string>,
    argumentsIn: ArgumentDefinition[],
    argumentsOut: ArgumentDefinition[]
  ) {
    this.type = type;

    if (description != null) {
      this.description = description;
    }

    if (argumentsIn != null) {
      this.in = argumentsIn;
    }

    if (argumentsOut != null) {
      this.out = argumentsOut;
    }
  }
}
