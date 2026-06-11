import {DataFormat, DataFormatCheck} from '../definition/property/data/DataFormat';
import { DataValue } from '../definition/property/data/DataValue';
import { DataValueFactory } from '../definition/property/data/DataValueFactory';

export class PropertyValue {

  format: DataFormat = DataFormat.BOOL;

  initValue: DataValue<any>;
  defaultValue: DataValue<any> | null = null;
  currentValue: DataValue<any> | null = null;

  static copy(o: PropertyValue): PropertyValue {
    const thiz = new PropertyValue(o.format);
    thiz.initValue = o.initValue;
    thiz.defaultValue = o.defaultValue;
    thiz.currentValue = o.currentValue;
    thiz._stringValue = o._stringValue;
    thiz._numberValue = o._numberValue;
    thiz._booleanValue = o._booleanValue;
    return thiz;
  }

  constructor(format: DataFormat) {
    this.format = format;
    this.initValue = DataValueFactory.createDefaultValue(format);
    this.refreshValueForDebuggerOrSimulator();
  }

  update(newValue: DataValue<any>): void {
    if (newValue == null) {
      throw new Error('update failed: newValue is null');
    }

    if (! DataFormatCheck(this.format, newValue)) {
      throw new Error('update failed: newValue invalid format');
    }

    this.currentValue = newValue;
    this.refreshValueForDebuggerOrSimulator();
  }

  public value(): DataValue<any> {
    if (this.currentValue != null) {
      return this.currentValue;
    }

    if (this.defaultValue != null) {
      return this.defaultValue;
    }

    return this.initValue;
  }

  /*----------------------------------------------------------------------
   * for debugger or simulator
   *----------------------------------------------------------------------*/
  private refreshValueForDebuggerOrSimulator(): void {
    switch (this.format) {
      case DataFormat.BOOL:
        this._booleanValue = this.value().rawValue();
        this._stringValue = this._booleanValue.toString();
        break;

      case DataFormat.FLOAT:
      case DataFormat.UINT8:
      case DataFormat.UINT16:
      case DataFormat.UINT32:
      case DataFormat.INT8:
      case DataFormat.INT16:
      case DataFormat.INT32:
      case DataFormat.INT64:
        this._numberValue = this.value().rawValue();
        this._stringValue = this._numberValue.toString();
        break;

      case DataFormat.STRING:
        this._stringValue = this.value().rawValue();
        break;

      case DataFormat.TLV8:
        this._stringValue = this.value().rawValue();
        break;

      case DataFormat.HEX:
        this._stringValue = this.value().rawValue();
        break;

      default:
        break;
    }
  }

  _stringValue = '';
  _numberValue = 0;
  _booleanValue = false;
}
