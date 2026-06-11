import {ServiceType} from '../definition/urn/ServiceType';
import {PropertyTemplate} from './PropertyTemplate';
import {ActionTemplate} from './ActionTemplate';
import {EventTemplate} from './EventTemplate';


/**
 * ouyang
 */
export class ServiceTemplate {
  iid: number;

  required: boolean;

  type: ServiceType;

  source: string;

  description: Map<string, string> = new Map<string, string>();

  properties: Map<number, PropertyTemplate> = new Map<number, PropertyTemplate>();

  actions: Map<number, ActionTemplate> = new Map<number, ActionTemplate>();

  events: Map<number, EventTemplate> = new Map<number, EventTemplate>();

  propertyAddable = false;

  actionAddable = false;

  eventAddable = false;

  constructor(
    iid: number,
    required: boolean,
    type: ServiceType,
    description: Map<string, string>,
    properties: PropertyTemplate[],
    actions: ActionTemplate[],
    events: EventTemplate[],
    propertyAddable: boolean,
    actionAddable: boolean,
    eventAddable: boolean,
    source: string
  ) {
    this.iid = iid;
    this.required = required;
    this.type = type;
    this.propertyAddable = propertyAddable;
    this.actionAddable = actionAddable;
    this.eventAddable = eventAddable;
    this.source = source;

    if (description != null) {
      this.description = description;
    }

    properties.forEach(x => {
      return this.properties.set(x.iid, x);
    });
    actions.forEach(x => {
      return this.actions.set(x.iid, x);
    });
    events.forEach(x => {
      return this.events.set(x.iid, x);
    });
  }

  getProperties(): PropertyTemplate[] {
    return Array.from(this.properties.values());
  }

  getActions(): ActionTemplate[] {
    return Array.from(this.actions.values());
  }

  getEvents(): EventTemplate[] {
    return Array.from(this.events.values());
  }
}
