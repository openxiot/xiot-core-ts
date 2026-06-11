import {Shadow} from '../../typedef/shadow/Shadow';
import {Spec} from '../../typedef/constant/Spec';

export class ShadowCodec {
  static decodeArray(list: any[]): Shadow[] {
    const array = [];

    if (list != null) {
      for (const o of list) {
        array.push(ShadowCodec.decodeObject(o));
      }
    }

    return array;
  }

  static decodeObject(o: any): Shadow {
    const shadow = new Shadow();
    shadow.siid = o[Spec.SIID] || 0;
    shadow.piid = o[Spec.PIID] || 0;
    shadow.status = o[Spec.STATUS] || 0;

    if (shadow.status >= 0) {
      shadow.value = o[Spec.VALUE];
    } else {
      shadow.description = o[Spec.DESCRIPTION] || '';
    }

    return shadow;
  }

  static encodeObject(s: Shadow): any {
    const o: any = {
      siid: s.siid,
      piid: s.piid,
      status: s.status
    };

    if (s.status >= 0) {
      o[Spec.VALUE] = s.value;
    } else {
      o[Spec.DESCRIPTION] = s.description;
    }

    return o;
  }

  static encodeArray(array: Array<Shadow>): any[] {
    return array != null
      ? array.map(s => {
          return ShadowCodec.encodeObject(s);
        })
      : [];
  }
}
