import {AbstractOperation} from './AbstractOperation';


export class SleepOperation extends AbstractOperation {
  private _seconds = 0;


  get seconds(): number {
    return this._seconds;
  }

  set seconds(value: number) {
    this._seconds = value;
  }

  toString(pretty = true, tab = false): string {
    let str = '';

    if (tab) {
      str += '    ';
    }

    str += `SLEEP => ${this.seconds};`;

    return str;
  }

}
