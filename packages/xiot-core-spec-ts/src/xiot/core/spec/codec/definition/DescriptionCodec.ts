import {Spec} from '../../typedef/constant/Spec';

export class DescriptionCodec {
  static decode(o: any): Map<string, string> {
    const description: Map<string, string> = new Map<string, string>();

    if (typeof o === 'string') {
      description.set(Spec.EN_US, o);
    } else if (typeof o === 'object') {
      Object.keys(o).forEach(x => {
        description.set(x.toString(), o[x]);
      });
    }

    return description;
  }

  static encode(description: Map<string, string>): any {
    if (description.size === 0) {
      return '';
    }

    if (description.size === 1) {
      return description.get(Spec.EN_US);
    }

    const o = Object.create(null);
    description.forEach((value, key) => {
      o[key.toString()] = value;
    });
    return o;
  }
}
