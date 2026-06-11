import {EventReceiver} from '../EventReceiver';
import {EventReceiverType} from '../EventReceiverType';

export class EventReceiverHttpImpl extends EventReceiver {

  constructor(
      public url: string
  ) {
    super(EventReceiverType.HTTP);
  }
}
