import {Argument} from '../instance/Argument';
import {Property} from '../instance/Property';

export class ArgumentImage extends Argument {

  properties: Property[] = [];

  // static of(argument: Argument): ArgumentImage {
  //   const a = new ArgumentImage(argument.piid);
  //   a.minRepeat = argument.minRepeat;
  //   a.maxRepeat = argument.maxRepeat;
  //   return a;
  // }

  // 适应 Argument 类的 of 方法签名
  static of(piid: number, minRepeat: number, maxRepeat: number): Argument {
    const a = new ArgumentImage(piid);
    a.minRepeat = minRepeat;
    a.maxRepeat = maxRepeat;
    return a;
  }

  static fromArgument(argument: Argument): ArgumentImage {
    const a = new ArgumentImage(argument.piid);
    a.minRepeat = argument.minRepeat;
    a.maxRepeat = argument.maxRepeat;
    return a;
  }

  constructor(piid: number) {
    super(piid);
  }
}
