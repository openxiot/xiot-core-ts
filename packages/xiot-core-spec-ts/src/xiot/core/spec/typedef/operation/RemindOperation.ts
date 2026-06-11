import {AbstractOperation} from './AbstractOperation';


export class RemindOperation extends AbstractOperation {
  private _text = '';

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  toString(pretty = true, tab = false): string {
    let str = '';

    if (tab) {
      str += '    ';
    }

    str += `REMIND => "${this.text}";`;

    return str;
  }

}
