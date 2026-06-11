export class Account {

  constructor(
    public id: number = 0,
    public nickname: string = '',
    public avatar: string = '',
    public email: string = '',
    public username: string | null = null,
    public password: string | null = null,
    public platformId: string = '',
    public platformAccountId: string = '',
  ) {
  }
}
