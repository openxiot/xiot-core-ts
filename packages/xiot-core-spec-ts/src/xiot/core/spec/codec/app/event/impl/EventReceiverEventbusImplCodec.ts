import {EventReceiverEventbusImpl} from '../../../../typedef/app/event/impl/EventReceiverEventbusImpl';

export class EventReceiverEventbusImplCodec {

  static encode(x: EventReceiverEventbusImpl): any {
    return {
      address: x.address,
    };
  }

  static decode(o: any): EventReceiverEventbusImpl {
    return new EventReceiverEventbusImpl(o['address']);
  }
}
