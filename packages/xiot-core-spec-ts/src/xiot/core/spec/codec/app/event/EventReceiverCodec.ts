import {EventReceiver} from '../../../typedef/app/event/EventReceiver';
import {EventReceiverType, EventReceiverTypeFromString} from '../../../typedef/app/event/EventReceiverType';
import {EventReceiverEventbusImplCodec} from './impl/EventReceiverEventbusImplCodec';
import {EventReceiverHttpImplCodec} from './impl/EventReceiverHttpImplCodec';
import {EventReceiverKafkaImplCodec} from './impl/EventReceiverKafkaImplCodec';
import {EventReceiverEventbusImpl} from '../../../typedef/app/event/impl/EventReceiverEventbusImpl';
import {EventReceiverHttpImpl} from '../../../typedef/app/event/impl/EventReceiverHttpImpl';
import {EventReceiverKafkaImpl} from '../../../typedef/app/event/impl/EventReceiverKafkaImpl';

export class EventReceiverCodec {

  static decode(o: any): EventReceiver {
    const type = EventReceiverTypeFromString(o.type);

    switch (type) {
      case EventReceiverType.EVENTBUS:
        return EventReceiverEventbusImplCodec.decode(o['eventbus']);

      case EventReceiverType.HTTP:
        return EventReceiverHttpImplCodec.decode(o['http']);

      case EventReceiverType.KAFKA:
        return EventReceiverKafkaImplCodec.decode(o['kafka']);

      default:
        throw new Error('EventReceiver Invalid: ' + o);
    }
  }

  static encode(x: EventReceiver): any {
    const o: any = {
      type: x.type.toString()
    };

    if (x instanceof EventReceiverEventbusImpl) {
      o.eventbus = EventReceiverEventbusImplCodec.encode(x);
    } else if (x instanceof EventReceiverHttpImpl) {
      o.http = EventReceiverHttpImplCodec.encode(x);
    } else if (x instanceof EventReceiverKafkaImpl) {
      o.kafka = EventReceiverKafkaImplCodec.encode(x);
    }

    return o;
  }
}
