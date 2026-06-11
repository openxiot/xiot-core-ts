import {Property} from '../instance/Property';
import {PropertyOperation} from '../operation/PropertyOperation';
import {Status} from '../status/Status';
import {PropertyType} from "../definition/urn/PropertyType";
import {DataFormat} from "../definition/property/data/DataFormat";
import {Access} from "../definition/property/Access";
import {ConstraintValue} from "../definition/property/ConstraintValue";

export class PropertyImage extends Property {

  static copy(other: Property): PropertyImage {
    return new PropertyImage(
        other.iid,
        other.type,
        other.description,
        other.format,
        other.access,
        other.constraintValue,
        other.unit,
        other.members
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
    super(iid,type, description, format, access, constraintValue, unit, members);
  }

  tryRead(o: PropertyOperation) {
    if (this.value == null) {
      o.status = <number>Status.INTERNAL_ERROR;
      o.description = 'property value is null';
      return;
    }

    if (this.access.isReadable) {
      o.value = this.value.currentValue?.rawValue();
    } else {
      o.status = <number>Status.PROPERTY_CANNOT_READ;
      o.description = 'property cannot read';
    }
  }

  tryWrite(o: PropertyOperation, save: boolean) {
    if (this.access.isWritable) {
      if (save) {
        this.update(o);
      } else if (super.trySetValue(o.value)) {
        o.status = <number>Status.COMPLETED;
      } else {
        o.status = <number>Status.PROPERTY_VALUE_INVALID;
        o.description = 'property value invalid';
      }
    } else {
      o.status = <number>Status.PROPERTY_CANNOT_WRITE;
      o.description = 'property cannot write';
    }
  }

  update(o: PropertyOperation) {
    if (this.setValue(o.value)) {
      o.status = <number>Status.COMPLETED;
    } else {
      o.status = <number>Status.PROPERTY_VALUE_INVALID;
      o.description = 'property value invalid';
    }
  }

  onPropertiesChanged(o: PropertyOperation) {
    if (this.access.isNotifiable) {
      this.update(o);
    } else {
      o.status = <number>Status.PROPERTY_CANNOT_NOTIFY;
      o.description = 'property cannot notify';
    }
  }
}
