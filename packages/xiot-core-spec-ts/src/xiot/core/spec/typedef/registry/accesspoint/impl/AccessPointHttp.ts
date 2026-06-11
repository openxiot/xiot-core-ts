import {AccessPoint} from '../AccessPoint';
import {AccessPointType} from '../AccessPointType';

export class AccessPointHttp extends AccessPoint {

  host!: string;
  port = 0;

  constructor() {
    super();
    this.type = AccessPointType.EVENTBUS;
  }
}
