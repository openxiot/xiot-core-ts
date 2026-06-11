import {Spec} from '../../typedef/constant/Spec';
import {Argument} from '../../typedef/instance/Argument';

export class ArgumentCodec {
  static decodeArray(list: any[]): Argument[] {
    const array: Argument[] = [];

    if (list != null) {
      list.forEach(o => {
        const a = ArgumentCodec.decode(o);
        if (a != null) {
          array.push(a);
        }
      });
    }

    return array;
  }

  static decode(o: any): Argument {
    if (typeof o === 'number') {
      return new Argument(o);
    }

    const piid: number = o[Spec.PIID];
    const def = new Argument(piid);
    const repeat = o[Spec.REPEAT];
    if (repeat != null) {
      def.minRepeat = repeat[0];
      def.maxRepeat = repeat[1];
    }

    return def;
  }

  static encode(def: Argument): any {
    return {
      piid: def.piid,
      repeat: [def.minRepeat, def.maxRepeat]
    };
  }

  static encodeArray(list: Argument[]): any[] {
    return list.map(x => {
      return ArgumentCodec.encode(x);
    });
  }
}
