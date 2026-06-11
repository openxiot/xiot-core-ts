import {Notice} from '../Notice';

export abstract class OwnerNotice extends Notice {
  appId: string;

  ownerId: string;

  userId: string;

  protected constructor(timestamp: number, appId: string, ownerId: string, userId: string) {
    super(timestamp);
    this.appId = appId;
    this.ownerId = ownerId;
    this.userId = userId;
  }

  mainType(): string {
    return 'owner';
  }

  abstract subType(): string;
}
