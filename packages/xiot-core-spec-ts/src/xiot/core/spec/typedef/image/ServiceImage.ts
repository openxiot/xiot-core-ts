import {Service} from '../instance/Service';
import {ServiceType} from '../definition/urn/ServiceType';
import {PropertyImage} from './PropertyImage';
import {ActionImage} from './ActionImage';
import {EventImage} from './EventImage';
import {PropertyOperation} from '../operation/PropertyOperation';
import {DataFormat} from '../definition/property/data/DataFormat';
import {Status} from '../status/Status';
import {ActionOperation} from '../operation/ActionOperation';
import {EventOperation} from '../operation/EventOperation';

export class ServiceImage extends Service {

  static of(s: Service): ServiceImage {
    return new ServiceImage(
        s.iid,
        s.type,
        s.description,
        s.getProperties().map(x => PropertyImage.copy(x)),
        s.getActions().map(x => ActionImage.of(x)),
        s.getEvents().map(x => EventImage.of(x))
    );
  }

  constructor(
    iid: number,
    type: ServiceType,
    description: Map<string, string>,
    properties: PropertyImage[],
    actions: ActionImage[],
    events: EventImage[]
  ) {
    super(iid, type, description, properties, actions, events);
  }

  override getProperties(): PropertyImage[] {
    return super
      .getProperties()
      .filter(x => x instanceof PropertyImage)
      .map(x => <PropertyImage>x);
  }

  override getActions(): ActionImage[] {
    return super
      .getActions()
      .filter(x => x instanceof ActionImage)
      .map(x => <ActionImage>x);
  }

  override getEvents(): EventImage[] {
    return super
      .getEvents()
      .filter(x => x instanceof EventImage)
      .map(x => <EventImage>x);
  }

  tryRead(o: PropertyOperation): void {
    if (o.pid == null) {
      return;
    }

    const p = this.properties.get(o.pid.iid);
    if (p != null) {
      if (p instanceof PropertyImage) {
        p.tryRead(o);
      } else {
        o.status = <number>Status.UNDEFINED;
        o.description = 'property not instanceof PropertyImage';
      }
    } else {
      o.status = <number>Status.PROPERTY_NOT_FOUND;
      o.description = 'property not found';
    }
  }

  tryWrite(o: PropertyOperation, save: boolean): void {
    if (o.pid == null) {
      return;
    }

    const p = this.properties.get(o.pid.iid);
    if (p != null) {
      if (p instanceof PropertyImage) {
        if (DataFormat.COMBINATION === p.format) {
          const members: Map<any, any> = o.value;
          for (const piid of p.members) {
            const value = members.get(piid);
            if (value === null || value === undefined) {
              o.status = Status.PROPERTY_VALUE_INVALID;
              o.description = `property value is null: piid: ${piid}`;
              break;
            }

            const propertyItem = this.properties.get(piid);
            if (!propertyItem?.trySetValue(value)) {
              o.status = Status.PROPERTY_VALUE_INVALID;
              o.description = `property value invalid: piid: ${piid}, value: ${value}`;
              break;
            }
          }

          if (o.status >= 0) {
            o.status = Status.COMPLETED;
          }
        } else {
          p.tryWrite(o, save);
        }
      } else {
        o.status = <number>Status.UNDEFINED;
        o.description = 'property not instanceof PropertyImage';
      }
    } else {
      o.status = <number>Status.PROPERTY_NOT_FOUND;
      o.description = 'property not found';
    }
  }

  tryInvoke(o: ActionOperation): void {
    if (o.aid == null) {
      return;
    }

    const a = this.actions.get(o.aid.iid);
    if (a != null) {
      if (a instanceof ActionImage) {
        a.tryInvoke(o, this.properties);
      } else {
        o.status = <number>Status.UNDEFINED;
        o.description = 'action not instanceof ActionImage';
      }
    } else {
      o.status = <number>Status.ACTION_NOT_FOUND;
      o.description = 'action not found';
    }
  }

  tryEventOccurred(o: EventOperation): void {
    if (o.eid == null) {
      return;
    }

    const e = this.events.get(o.eid.iid);
    if (e != null) {
      if (e instanceof EventImage) {
        e.tryEventOccurred(o, this.properties);
      } else {
        o.status = <number>Status.UNDEFINED;
        o.description = 'event not instanceof EventImage';
      }
    } else {
      o.status = <number>Status.EVENT_NOT_FOUND;
      o.description = 'event not found';
    }
  }

  update(o: PropertyOperation): void {
    if (o.pid == null) {
      return;
    }

    const p = this.properties.get(o.pid.iid);
    if (p != null) {
      if (p instanceof PropertyImage) {
        p.update(o);
      } else {
        o.status = <number>Status.UNDEFINED;
        o.description = 'property not instanceof PropertyImage';
      }
    } else {
      o.status = <number>Status.PROPERTY_NOT_FOUND;
      o.description = 'property not found';
    }
  }

  onPropertiesChanged(o: PropertyOperation): void {
    if (o.pid == null) {
      return;
    }

    const p = this.properties.get(o.pid.iid);
    if (p != null) {
      if (p instanceof PropertyImage) {
        p.onPropertiesChanged(o);
      } else {
        o.status = <number>Status.UNDEFINED;
        o.description = 'property not instanceof PropertyImage';
      }
    } else {
      o.status = <number>Status.PROPERTY_NOT_FOUND;
      o.description = 'property not found';
    }
  }
}
