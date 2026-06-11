import {EventReceiver} from './event/EventReceiver';
import {Authorization} from './authorization/Authorization';

export class Application {

  appId = '';
  name = '';
  eventReceiver!: EventReceiver;
  authorization!: Authorization;
  organization = '';
  createBy = '';
  createAt = '';
}
