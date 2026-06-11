import {Application} from '../../typedef/app/Application';
import {EventReceiverCodec} from './event/EventReceiverCodec';
import {AuthorizationCodec} from './authorization/AuthorizationCodec';

export class ApplicationCodec {

  static decodeArray(array: any[]): Application[] {
    return array
      ? array.map(x => {
        return ApplicationCodec.decode(x);
      })
      : [];
  }

  static decode(o: any): Application {
    const app: Application = new Application();

    app.appId = o.appId;
    app.name = o.name;
    app.organization = o.organization;
    app.eventReceiver = EventReceiverCodec.decode(o.event);
    app.authorization = AuthorizationCodec.decode(o.authorization);
    app.createBy = o.createBy;
    app.createAt = o.createAt;

    return app;
  }

  static encode(x: Application): any {
    const o: any = {
      appId: x.appId,
      name: x.name,
      organization: x.organization,
      createBy: x.createBy,
      createAt: x.createAt
    };

    if (x.authorization != null) {
      o.authorization = AuthorizationCodec.encode(x.authorization);
    }

    if (x.eventReceiver != null) {
      o.event = EventReceiverCodec.encode(x.eventReceiver);
    }

    return o;
  }

  static encodeArray(children: Application[]): any[] {
    return children != null
      ? children.map(s => {
        return ApplicationCodec.encode(s);
      })
      : [];
  }
}
