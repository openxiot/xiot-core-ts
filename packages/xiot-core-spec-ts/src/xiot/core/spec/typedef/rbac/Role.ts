export class Role {

  constructor(
    public id: number = 0,
    public parent_id: number = 0,
    public text: string = '',
    public permission: number[] = []
  ) {
  }
}
