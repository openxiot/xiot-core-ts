
export class Permission {
  constructor(
    public id: number = 0,
    public parent_id: number = 0,
    public text: string = '',
    public code: string = '',
    public remark: string = ''
  ) {
  }
}
