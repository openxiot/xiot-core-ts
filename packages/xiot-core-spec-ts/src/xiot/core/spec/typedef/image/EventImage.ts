import {Event} from '../instance/Event';
import {EventType} from '../definition/urn/EventType';
import {EventOperation} from '../operation/EventOperation';
import {ArgumentImage} from './ArgumentImage';
import {Property} from '../instance/Property';
import {Status} from '../status/Status';

export class EventImage extends Event {

  static of(event: Event): EventImage {
    return new EventImage(
        event.iid,
        event.type,
        event.description,
        event.getArguments().map(x => ArgumentImage.fromArgument(x))
    );
  }

  constructor(iid: number, type: EventType, description: Map<string, string>, list: ArgumentImage[]) {
    super(iid, type, description, list);
  }

  tryEventOccurred(o: EventOperation, properties: Map<number, Property>) {
    o.status = <number>Status.COMPLETED;

    for (const spec of this.getArguments()) {
      const v = o.arguments.get(spec.piid);
      if (v == null) {
        o.status = <number>Status.EVENT_ARGUMENTS_ERROR;
        o.description = 'event argument error';
        break;
      }

      if (spec.minRepeat > 0) {
        o.status = <number>Status.EVENT_ARGUMENTS_ERROR;
        o.description = 'event argument error, min repeat > 0';
        break;
      }

      const property = properties.get(spec.piid);
      if (property == null) {
        o.status = <number>Status.EVENT_ARGUMENTS_ERROR;
        o.description = 'event argument error, value invalid';
        break;
      }

      if (!property.trySetValues(v.values)) {
        o.status = <number>Status.EVENT_ARGUMENTS_ERROR;
        o.description = 'event argument error, set value failed';
        break;
      }
    }
  }

  override getArguments(): ArgumentImage[] {
    return super
        .getArguments()
        .filter(x => x instanceof ArgumentImage)
        .map(x => <ArgumentImage>x);
  }
}
