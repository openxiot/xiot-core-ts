import {Notice} from '../Notice';

export abstract class DeviceNotice extends Notice {
  protected constructor(timestamp: number) {
    super(timestamp);
  }

  mainType(): string {
    return 'device';
  }

  abstract subType(): string;
}
