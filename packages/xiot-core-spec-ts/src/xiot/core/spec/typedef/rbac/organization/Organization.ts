import {Member} from './Member';

export class Organization {

  public _member: Member | null = null;

  constructor(
    public id: string = '',
    public description: string = '',
    public roles: number[] = []
  ) {
  }
}
