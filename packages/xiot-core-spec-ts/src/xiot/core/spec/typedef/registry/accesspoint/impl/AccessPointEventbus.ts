import {AccessPoint} from '../AccessPoint';
import {AccessPointType} from '../AccessPointType';

export class AccessPointEventbus extends AccessPoint {

  address!: string;

  constructor() {
    super();
    this.type = AccessPointType.EVENTBUS;
  }
}
