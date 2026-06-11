import {Status} from '../status/Status';

export abstract class AbstractOperation {
  _message: any = {};
  status: number = Status.COMPLETED;
  description = '';

  isError(): boolean {
    return this.status < 0;
  }

  isCompleted(): boolean {
    return this.status === 0;
  }

  isNotCompleted(): boolean {
    return this.status === Status.TO_BE_EXECUTE;
  }

  abstract toString(pretty?: boolean, tab?: boolean): string;
}
