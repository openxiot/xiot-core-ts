import { ServiceType } from '../definition/urn/ServiceType';
import { Property } from './Property';
import { Action } from './Action';
import { Event } from './Event';

export class Service {
  iid = 0;

  type: ServiceType;

  description: Map<string, string> = new Map<string, string>();

  properties: Map<number, Property> = new Map<number, Property>();

  actions: Map<number, Action> = new Map<number, Action>();

  events: Map<number, Event> = new Map<number, Event>();

  _readablePropertiesCount = 0;

  _writablePropertiesCount = 0;

  _notifiablePropertiesCount = 0;

  constructor(
    iid: number,
    type: ServiceType,
    description: Map<string, string>,
    properties: Property[],
    actions: Action[],
    events: Event[]
  ) {
    this.iid = iid;
    this.type = type;
    this.description = description;

    properties.forEach(x => {
      return this.properties.set(x.iid, x);
    });
    actions.forEach(x => {
      return this.actions.set(x.iid, x);
    });
    events.forEach(x => {
      return this.events.set(x.iid, x);
    });

    properties.forEach(x => {
      if (x.access.isReadable) {
        this._readablePropertiesCount++;
      }

      if (x.access.isWritable) {
        this._writablePropertiesCount++;
      }

      if (x.access.isNotifiable) {
        this._notifiablePropertiesCount++;
      }
    });
  }

  getProperties(): Property[] {
    return Array.from(this.properties.values());
  }

  getActions(): Action[] {
    return Array.from(this.actions.values());
  }

  getEvents(): Event[] {
    return Array.from(this.events.values());
  }
}
