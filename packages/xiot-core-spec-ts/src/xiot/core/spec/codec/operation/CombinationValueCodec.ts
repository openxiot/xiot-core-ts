export class CombinationValueCodec {
  static decodeObject(o: any): Map<number, any> {
    const members: Map<number, any> = new Map();
    // tslint:disable-next-line:forin
    for (const key in o) {
      const piid: string = key.substring(1);
      members.set(parseInt(piid, 10), o[key]);
    }
    return members;
  }

  static decodeArray(array: any[]): Map<number, any> {
    const members: Map<number, any> = new Map();
    if (array?.length) {
      array.forEach(o => {
        if (typeof o === 'object') {
          const piid: number = o.piid;
          const value: any = o.value;

          // value = [{}, {}, {}]，这里被识别为object
          if (typeof value === 'object') {
            members.set(piid, CombinationValueCodec.decodeArray(value));
          } else {
            members.set(piid, value);
          }
        }
      });
    }
    return members;
  }

  static encodeWithCompact(compact: boolean, members: Map<any, any>): any {
    const keys = Array.from(members.keys());
    if (compact) {
      const o: any = {};
      for (const key of keys) {
        const value = members.get(key);
        if (typeof value === 'object') {
          o[`#${key}`] = CombinationValueCodec.encodeWithCompact(compact, value);
        } else {
          o[`#${key}`] = value;
        }
      }
      return o;
    }
    const array = [];
    for (const key of keys) {
      const value = members.get(key);
      if (typeof value === 'object') {
        array.push({
          piid: key,
          value: CombinationValueCodec.encodeWithCompact(compact, value)
        });
      } else {
        array.push({
          piid: key,
          value: value
        });
      }
    }
    return array;
  }

  static encode(members: Map<number, any>) {
    return this.encodeWithCompact(false, members);
  }
}
