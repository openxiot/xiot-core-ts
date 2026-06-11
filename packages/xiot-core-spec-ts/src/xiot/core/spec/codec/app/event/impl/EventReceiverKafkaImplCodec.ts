import {EventReceiverKafkaImpl} from '../../../../typedef/app/event/impl/EventReceiverKafkaImpl';

export class EventReceiverKafkaImplCodec {

  static encode(x: EventReceiverKafkaImpl): any {
    return {
      topic: x.topic,
      bootstrapServers: x.bootstrapServers,
    };
  }

  static decode(o: any): EventReceiverKafkaImpl {
    const topic: string = o.topic;
    const bootstrapServers: string = o.bootstrapServers;
    return new EventReceiverKafkaImpl(topic, bootstrapServers);
  }
}
