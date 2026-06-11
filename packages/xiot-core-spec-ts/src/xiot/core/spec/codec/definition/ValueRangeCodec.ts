import {DataFormat} from '../../typedef/definition/property/data/DataFormat';
import {ValueRange} from '../../typedef/definition/property/ValueRange';


export class ValueRangeCodec {
  static decode(format: DataFormat, range: any[]): ValueRange {
    return new ValueRange(format, range);
  }

  static encode(values: ValueRange): any[] {
    return values.toList();
  }
}
