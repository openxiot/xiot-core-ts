import {EventReceiverHttpImpl} from '../../../../typedef/app/event/impl/EventReceiverHttpImpl';

export class EventReceiverHttpImplCodec {

  static encode(x: EventReceiverHttpImpl): any {
    return {
      url: x.url
    };
  }

  static decode(o: any): EventReceiverHttpImpl {
    return new EventReceiverHttpImpl(o['url']);
  }
}
