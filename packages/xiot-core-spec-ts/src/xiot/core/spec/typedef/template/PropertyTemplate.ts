import {Property} from '../instance/Property';
import {PropertyType} from "../definition/urn/PropertyType";
import {DataFormat} from "../definition/property/data/DataFormat";
import {Access} from "../definition/property/Access";
import {ConstraintValue} from "../definition/property/ConstraintValue";


export class PropertyTemplate extends Property {

  // iid: number;
  // required: boolean;
  // source: string;
  // members: number[] = [];

  constructor(
      iid = 0,
      type: PropertyType,
      description: Map<string, string>,
      format: DataFormat,
      access: Access,
      constraintValue: ConstraintValue | null = null,
      unit: string | null = null,
      members: Array<number> = [],
      public required: boolean,
      public source: string
  ) {
    super(iid, type, description, format, access, constraintValue, unit, members);
  }
}
