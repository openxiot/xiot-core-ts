import { PropertyType } from './urn/PropertyType';
import { DataFormat } from './property/data/DataFormat';
import { Access } from './property/Access';
import { ConstraintValue } from './property/ConstraintValue';
import {ValueRange} from "./property/ValueRange";
import {ValueList} from "./property/ValueList";

export class PropertyDefinition {
  type: PropertyType;

  description: Map<string, string> = new Map<string, string>();

  format: DataFormat = DataFormat.BOOL;

  access: Access = new Access();

  constraintValue: ConstraintValue | null = null;

  unit: string | null = null;

  members: Array<PropertyType> = [];

  constructor(type: PropertyType, description: Map<string, string>) {
    this.type = type;
    if (description != null) {
      this.description = description;
    }
  }

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
}
