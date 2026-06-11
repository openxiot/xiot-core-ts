import {Device, DeviceShadow} from '@gkct/xiot-core-spec-ts';
import { IQQuery } from '../../IQQuery';
import { IQResult } from '../../IQResult';

export const GET_SHADOW_METHOD = 'urn:xiot:get-shadow';

export class QueryGetShadow extends IQQuery {
  did = '';

  constructor(id: string, did: string) {
    super(id, GET_SHADOW_METHOD);
    this.did = did;
  }

  public result(device: DeviceShadow): ResultGetShadow {
    return new ResultGetShadow(this.id, device);
  }
}

export class ResultGetShadow extends IQResult {
  public device: DeviceShadow;

  constructor(id: string, device: DeviceShadow) {
    super(id, GET_SHADOW_METHOD);
    this.device = device;
  }
}
