export class Access {

  public isReadable = false;
  public isWritable = false;
  public isNotifiable = false;

  static of(readable: boolean, writable: boolean, notifiable: boolean): Access {
    const thiz = new Access();
    thiz.isReadable = readable;
    thiz.isWritable = writable;
    thiz.isNotifiable = notifiable;
    return thiz;
  }

  static create(access: Array<string>): Access {
    const thiz = new Access();

    for (const v of access) {
      switch (v) {
        case 'read':
          thiz.isReadable = true;
          break;

        case 'write':
          thiz.isWritable = true;
          break;

        case 'notify':
          thiz.isNotifiable = true;
          break;
      }
    }

    return thiz;
  }

  toList(): Array<string> {
    const array = [];

    if (this.isReadable) {
      array.push('read');
    }

    if (this.isWritable) {
      array.push('write');
    }

    if (this.isNotifiable) {
      array.push('notify');
    }

    return array;
  }

  toString(): string {
    const array = [];

    if (this.isReadable) {
      array.push('R');
    }

    if (this.isWritable) {
      array.push('W');
    }

    if (this.isNotifiable) {
      array.push('N');
    }

    return array.join(' ');
  }

  toZhCNList(): string[] {
    const array = [];

    if (this.isReadable) {
      array.push('可读');
    }

    if (this.isWritable) {
      array.push('可写');
    }

    if (this.isNotifiable) {
      array.push('可通知');
    }

    return array;
  }

  toListOptions(): any[] {
    const array = [];
    if (this.isReadable) {
      array.push({ key: 'read', value: '可读' });
    }

    if (this.isWritable) {
      array.push({ key: 'write', value: '可写' });
    }

    if (this.isNotifiable) {
      array.push({ key: 'notify', value: '可通知' });
    }

    return array;
  }
}
