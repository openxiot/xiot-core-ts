import { ServiceType } from './urn/ServiceType';
import { PropertyType } from './urn/PropertyType';
import { ActionType } from './urn/ActionType';
import { EventType } from './urn/EventType';

export class ServiceDefinition {
  type: ServiceType;

  description: Map<string, string> = new Map<string, string>();

  requiredProperties: PropertyType[] = [];

  optionalProperties: PropertyType[] = [];

  requiredActions: ActionType[] = [];

  optionalActions: ActionType[] = [];

  requiredEvents: EventType[] = [];

  optionalEvents: EventType[] = [];

  constructor(
    type: ServiceType,
    description: Map<string, string>,
    requiredProperties: PropertyType[],
    optionalProperties: PropertyType[],
    requiredActions: ActionType[],
    optionalActions: ActionType[],
    requiredEvents: EventType[],
    optionalEvents: EventType[]
  ) {
    this.type = type;

    if (description != null) {
      this.description = description;
    }

    if (requiredProperties != null) {
      this.requiredProperties = requiredProperties;
    }

    if (optionalProperties != null) {
      this.optionalProperties = optionalProperties;
    }

    if (requiredActions != null) {
      this.requiredActions = requiredActions;
    }

    if (optionalActions != null) {
      this.optionalActions = optionalActions;
    }

    if (requiredEvents != null) {
      this.requiredEvents = requiredEvents;
    }

    if (optionalEvents != null) {
      this.optionalEvents = optionalEvents;
    }
  }
}
