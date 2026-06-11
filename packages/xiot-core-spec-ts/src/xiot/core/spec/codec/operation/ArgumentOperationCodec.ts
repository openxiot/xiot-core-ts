import {Spec} from '../../typedef/constant/Spec';
import {ArgumentOperation} from '../../typedef/operation/ArgumentOperation';

export class ArgumentOperationCodec {
  static decodeArray(list: any[]): ArgumentOperation[] {
    const array: ArgumentOperation[] = [];

    if (list != null) {
      list.forEach(o => {
        const a = ArgumentOperationCodec.decode(o);
        if (a != null) {
          array.push(a);
        }
      });
    }

    return array;
  }
  static decodeObjet(o: any): ArgumentOperation[] {
    const list: ArgumentOperation[] = [];

    Object.keys(o).forEach(key => {
      if (key.startsWith('#')) {
        const iid = key.substring(1);
        if (o[key] instanceof Array) {
          list.push(ArgumentOperationCodec.decodeArgument1(iid, o[key]));
        }
      }
    });

    return list;
  }

  private static decodeArgument1(piid: string, values: []): ArgumentOperation {
    return ArgumentOperationCodec.decodeArgument2(Number.parseInt(piid), values);
  }

  private static  decodeArgument2(piid: number, values: []): ArgumentOperation {
    return new ArgumentOperation(piid, values);
  }

  static decode(o: any): ArgumentOperation {
    if (typeof o === 'number') {
      return new ArgumentOperation(o, []);
    }

    return new ArgumentOperation(o[Spec.PIID] || 0, o[Spec.VALUES] || []);
  }

  static encode(argument: ArgumentOperation): any {
    return {
      piid: argument.piid,
      values: argument.values
    };
  }

  static encodeArray(compact: boolean, list: ArgumentOperation[]): any[] {
    if (compact) {
      const object: any = {};

      for (let i = 0; i < list.length; i++) {
        object['#' + list[i].piid] = list[i].values;
      }

      return object;
    } else {
      return list.map(x => {
        return ArgumentOperationCodec.encode(x);
      });
    }
  }
}
