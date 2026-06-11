import {EventReceiverType} from '../EventReceiverType';
import {EventReceiver} from '../EventReceiver';

export class EventReceiverEventbusImpl extends EventReceiver {

  constructor(
      public address: string
  ) {
    super(EventReceiverType.EVENTBUS);
  }
}
