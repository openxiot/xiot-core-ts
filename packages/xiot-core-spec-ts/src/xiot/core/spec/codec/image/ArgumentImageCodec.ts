import {Spec} from '../../typedef/constant/Spec';
import {ArgumentImage} from '../../typedef/image/ArgumentImage';
import {Argument} from '../../typedef/instance/Argument';


export class ArgumentImageCodec {
  static decodeArray(list: any[]): ArgumentImage[] {
    const array: ArgumentImage[] = [];

    if (list != null) {
      list.forEach(o => {
        const a = ArgumentImageCodec.decode(o);
        if (a != null) {
          array.push(a);
        }
      });
    }

    return array;
  }

  static decode(o: any): ArgumentImage {
    if (typeof o === 'number') {
      return new ArgumentImage(o);
    }

    const piid: number = o[Spec.PIID];
    const def: ArgumentImage = new ArgumentImage(piid);
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
      return ArgumentImageCodec.encode(x);
    });
  }
}
