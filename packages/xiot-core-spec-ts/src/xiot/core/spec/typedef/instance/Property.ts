import {PropertyValue} from './PropertyValue';
import {DataValueFactory} from '../definition/property/data/DataValueFactory';
import {DataFormat} from '../definition/property/data/DataFormat';
import {Access} from '../definition/property/Access';
import {ConstraintValue} from '../definition/property/ConstraintValue';
import {PropertyType} from "../definition/urn/PropertyType";
import {DataValue} from "../definition/property/data/DataValue";
import {PropertyOperation} from "../operation/PropertyOperation";
import {IotError} from "../error/IotError";
import {Status} from "../status/Status";
import {PropertyDefinition} from "../definition/PropertyDefinition";
import {ValueRange} from "../definition/property/ValueRange";
import {ValueList} from "../definition/property/ValueList";

export class Property  {
  value: PropertyValue;

  static copy(other: Property): Property {
    const p = new Property(
        other.iid,
        other.type,
        other.description,
        other.format,
        other.access,
        other.constraintValue,
        other.unit,
        other.members
    )
    p.value = PropertyValue.copy(other.value);
    return p;
  }

  static of(iid: number, def: PropertyDefinition): Property {
    return new Property(
        iid,
        def.type,
        def.description,
        def.format,
        def.access,
        def.constraintValue,
        def.unit,
        []
    )
  }

  constructor(
      public iid = 0,
      public type: PropertyType,
      public description: Map<string, string>,
      public format: DataFormat,
      public access: Access,
      public constraintValue: ConstraintValue | null = null,
      public unit: string | null = null,
      public members: Array<number> = []
  ) {
    this.value = new PropertyValue(this.format);
  }

  // fixDefaultValue(): void {
  //   const list = this.valueList();
  //   const range = this.valueRange();
  //
  //   if (list != null) {
  //     const v: ValueDefinition = list.values[0];
  //     if (v != null) {
  //       this.value.currentValue = v.value;
  //     }
  //   } else if (range != null) {
  //     const v = range.minValue;
  //     if (v != null) {
  //       this.value.currentValue = v;
  //     }
  //   }
  // }

  hasConstraintValue(): boolean {
    return this.constraintValue != null;
  }

  hasValueRange(): boolean {
    return this.constraintValue instanceof ValueRange;
  }


  hasValueList(): boolean {
    return this.constraintValue instanceof ValueList;
  }

  valueRange(): ValueRange | null{
    if (this.constraintValue instanceof ValueRange) {
      return this.constraintValue;
    }

    return null;
  }

  valueList(): ValueList | null{
    if (this.constraintValue instanceof ValueList) {
      return this.constraintValue;
    }

    return null;
  }

  formatCombination(): boolean {
    return this.format == DataFormat.COMBINATION;
  }

  formatBoolean(): boolean {
    return this.format == DataFormat.BOOL;
  }

  formatString(): boolean {
    switch (this.format) {
      case DataFormat.STRING:
      case DataFormat.HEX:
      case DataFormat.TLV8:
        return true;

      default:
        return false;
    }
  }

  formatNumber(): boolean {
    switch (this.format) {
      case DataFormat.FLOAT:
      case DataFormat.UINT8:
      case DataFormat.UINT16:
      case DataFormat.UINT32:
      case DataFormat.INT8:
      case DataFormat.INT16:
      case DataFormat.INT32:
      case DataFormat.INT64:
        return true;

      default:
        return false;
    }
  }

  setDefaultValue(value: any) {
    if (value != null) {
      const v = DataValueFactory.create(this.format, value);
      if (this.validate(v)) {
        this.value.defaultValue = v;
      } else {
        console.log("setDefaultValue error, validate failed!");
      }
    }
  }

  trySetValues(values: any[]): boolean {
    for (const o of values) {
      if (!this.trySetValue(o)) {
        return false;
      }
    }

    return true;
  }

  trySetValue(value: Object): boolean {
    return this.setDataValue(value, false);
  }

  setValue(value: Object): boolean {
    return this.setDataValue(value, true);
  }

  setValueForOperation(o: PropertyOperation): void {
    try {
      this.setDataValueWithException(DataValueFactory.create(this.format, o.value), true);
      o.status  = Status.COMPLETED;
    } catch (e) {
      if (e instanceof IotError) {
        o.status = e.status;
        o.description = e.description;
      } else {
        o.status = Status.INTERNAL_ERROR;
        o.description = 'undefined error';
      }
    }
  }

  private setDataValue(newValue: Object, write: boolean): boolean {
    if (newValue == null) {
      console.log('setDataValue failed: newValue is null');
      return false;
    }

    let v;

    try {
        v = DataValueFactory.create(this.format, newValue);
    } catch (e) {
        console.log('DataValueFactory.create failed: newValue: ' + newValue + ', format: ' + this.format + ', iid: ' + this.iid + ' => ', e);
        return false;
    }

    if (!this.validate(v)) {
      console.log('setDataValue failed, validate failed: ', v);
      return false;
    }

    if (this.value == null) {
      console.log('setDataValue failed, property.value is null');
      return false;
    }

    if (write) {
      this.value.update(v);
    }

    return true;
  }

  private setDataValueWithException(newValue: DataValue<any>, write: boolean): void {
    if (newValue == null) {
      throw new IotError(Status.PROPERTY_VALUE_ERROR, "property value is null");
    }

    if (!this.validate(newValue)) {
      throw new IotError(Status.PROPERTY_VALUE_INVALID, "property value invalid: " + newValue.rawValue());
    }

    if (write) {
      this.value.update(newValue);
    }
  }

  private validate(value: DataValue<any>): boolean {
    if (value == null) {
      console.log("property value validate failed, value is null");
      return false;
    }

    if (this.format !== value.getFormat()) {
      console.log(`validate failed, format not matched: ${this.format.toString()} != ${value.getFormat().toString()}`);
      return false;
    }

    if (this.constraintValue == null) {
      return true;
    }

    if (this.constraintValue.validate(value)) {
      return true;
    }

    console.log('validate failed: ', `${this.constraintValue.toString()} invalid value: ${value.rawValue()}`);
    return false;
  }

  public getValue(): any {
    if (this.format == DataFormat.COMBINATION) {
      if (this.value.value().rawValue() instanceof Map) {
        const v = this.value.value().rawValue();
        return this.valueOf(v);
      } else {
        return null;
      }
    } else {
      return this.value.value().rawValue();
    }
  }

  /**
   * 忽略属性是否可写，给属性的成员赋值时，使用此接口给属性赋值。
   * @param value 属性值
   */
  public put( value: any): void {
    if (this.format == DataFormat.COMBINATION) {
      if (! this.setValue(this.toMap(value))) {
        throw new IotError(Status.PROPERTY_VALUE_ERROR, "property value invalid");
      }
    } else {
      if (! this.setValue(value)) {
        throw new IotError(Status.PROPERTY_VALUE_ERROR, "property value invalid");
      }
    }
  }

  /**
   * 忽略属性是否可写，给属性的成员赋值时，使用此接口给属性赋值。
   * @param value 属性值
   */
  public putValue(value: any): void {
    if (! this.setValue(value)) {
      throw new IotError(Status.PROPERTY_VALUE_ERROR, "property value invalid");
    }
  }

  /**
   * 构造组合属性值，由具体的组合属性实现，普通属性不需要实现。
   */
  valueOf(value: Map<number, any>): any | null {
    return null;
  }

  toMap(value: any): Map<number, any> {
    return new Map<number, any>();
  }
}
