import {AbstractOperation} from './AbstractOperation';

export class RuleOperation extends AbstractOperation {
  private _ruleId: string;

  constructor(ruleId: string) {
    super();
    this._ruleId = ruleId;
  }

  get ruleId(): string {
    return <string>this._ruleId;
  }

  set ruleId(value: string) {
    this._ruleId = value;
  }

  toString(pretty = true, tab = false): string {
    let str = '';

    if (tab) {
      str += '    ';
    }

    str += `@${this.ruleId};`;

    return str;
  }

}
