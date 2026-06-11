import { ConstraintValue } from './ConstraintValue';
import { ValueDefinition } from './ValueDefinition';
import { DataValue } from './data/DataValue';

export class ValueList implements ConstraintValue {
  public values: ValueDefinition[] = [];

  validate(value: DataValue<any>): boolean {
    for (const v of this.values) {
      if (v.value.equals(value)) {
        return true;
      }
    }

    return false;
  }

  public toString(): string {
    const v = this.values.map(x => x.value.rawValue());
    return v.join(",");
  }
}
