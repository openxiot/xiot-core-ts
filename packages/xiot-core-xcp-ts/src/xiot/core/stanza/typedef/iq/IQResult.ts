import { IQ } from './IQ';
import { IQType } from './IQType';

export class IQResult extends IQ {

  public method: string;

  constructor(id: string, method: string, content?: any) {
    super(id, IQType.RESULT);
    this.method = method;
    this.content = content;
  }
}
