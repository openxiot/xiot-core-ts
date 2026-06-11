import { IQ } from './IQ';
import { IQError } from './IQError';
import { IQType } from './IQType';

export class IQQuery extends IQ {

  public method: string;

  constructor(id: string, method: string, content?: any) {
    super(id, IQType.QUERY);
    this.method = method;
    this.content = content;
  }

  public error(status: number, description: string): IQError {
    return new IQError(this.id, status, description);
  }
}
