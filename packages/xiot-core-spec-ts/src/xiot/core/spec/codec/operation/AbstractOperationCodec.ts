/**
 *  encode: T -> K
 *  decode: K -> T
 */
export abstract class AbstractOperationCodec<T, K> {
  decodeArray(array: any[]): Array<T> {
    const list: Array<T> = [];

    if (array == null) {
      return [];
    }

    for (const item of array) {
      list.push(this.decodeObject(item));
    }

    return list;
  }

  abstract decodeObject(o: any): T;

  encodeArray(list: T[]): any[] {
    const array: any[] = [];

    for (const t of list) {
      array.push(this.encodeObject(t));
    }

    return array;
  }

  abstract encodeObject(t: T): K;
}
