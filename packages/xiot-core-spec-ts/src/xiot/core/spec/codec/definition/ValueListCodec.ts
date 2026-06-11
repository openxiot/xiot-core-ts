import {Spec} from '../../typedef/constant/Spec';
import {ValueList} from '../../typedef/definition/property/ValueList';
import {ValueDefinition} from '../../typedef/definition/property/ValueDefinition';
import {DescriptionCodec} from './DescriptionCodec';
import {DataFormat} from '../../typedef/definition/property/data/DataFormat';

export class ValueListCodec {
  static decode(format: DataFormat, array: any[]): ValueList {
    const list = new ValueList();

    if (array != null) {
      for (const v of array) {
        if (v.hasOwnProperty('value') && v.hasOwnProperty('description')) {
          list.values.push(new ValueDefinition(format, v[Spec.VALUE], DescriptionCodec.decode(v[Spec.DESCRIPTION])));
        }
      }
    }

    return list;
  }

  static encode(list: ValueList): any[] {
    const array: any[] = [];

    for (const v of list.values) {
      const o: any = {};
      o[Spec.VALUE] = v.value.rawValue();
      o[Spec.DESCRIPTION] = DescriptionCodec.encode(v.description);
      array.push(o);
    }

    return array;
  }
}
