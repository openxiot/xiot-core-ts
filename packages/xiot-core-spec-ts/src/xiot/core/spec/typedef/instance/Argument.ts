export class Argument {
  piid: number;

  minRepeat = 1;

  maxRepeat = 1;

  values: any[] = [];

  constructor(piid: number) {
    this.piid = piid;
  }

  static of(piid: number, minRepeat: number, maxRepeat: number): Argument {
    const arg = new Argument(piid);
    arg.minRepeat = minRepeat;
    arg.maxRepeat = maxRepeat;
    return arg;
  }
}
