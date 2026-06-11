import {OwnerPropertiesChanged} from '../../../typedef/notice/owner/impl/OwnerPropertiesChanged';
import {PropertyOperationCodec} from '../../operation/PropertyOperationCodec';

export class OwnerPropertiesChangedCodec {
  static encode(x: OwnerPropertiesChanged): any {
    return {
      timestamp: x.timestamp,
      appId: x.appId,
      ownerId: x.ownerId,
      properties: PropertyOperationCodec.Notify.encodeArray(x.properties)
    };
  }

  static decode(o: any): OwnerPropertiesChanged {
    const { appId = '', ownerId = '', userId = '' } = o;
    const properties = PropertyOperationCodec.Notify.decodeArray(o.properties);
    return new OwnerPropertiesChanged(
        o.timestamp || new Date().getTime(),
        appId,
        ownerId,
        userId,
        properties
    );
  }
}
