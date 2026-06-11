import {EventReceiver} from '../EventReceiver';
import {EventReceiverType} from "../EventReceiverType";

export class EventReceiverKafkaImpl extends EventReceiver {

  constructor(
    public topic: string,
    public bootstrapServers: string
  ) {
    super(EventReceiverType.KAFKA);
  }
}
