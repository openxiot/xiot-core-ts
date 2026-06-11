import {PropertyImage} from '../../typedef/image/PropertyImage';
import {PropertyCodec} from '../instance/PropertyCodec';


export class PropertyImageCodec {
  static decodeArray(array: any[]): PropertyImage[] {
    const list: PropertyImage[] = [];

    if (array != null) {
      for (const o of array) {
        const p = PropertyImage.copy(PropertyCodec.decode(o));

        list.push(p);
      }
    }

    return list;
  }
}
