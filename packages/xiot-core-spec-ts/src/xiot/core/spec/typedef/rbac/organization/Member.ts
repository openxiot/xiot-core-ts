import {Account} from '../account/Account';

export class Member {

  public _account: Account | null = null;

  constructor(
    public organizationId: string = '',
    public accountId: number = 0,
    public status: string = 'generic',
    public role: number = 0
  ) {
  }

  public get manager(): boolean {
    return this.status === 'manager';
  }

  public get generic(): boolean {
    return this.status === 'generic'
  }

  public get candidate(): boolean {
    return this.status === 'candidate'
  }
}
