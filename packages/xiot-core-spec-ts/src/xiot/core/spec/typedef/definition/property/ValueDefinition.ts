import { DataValue } from './data/DataValue';
import { DataFormat } from './data/DataFormat';
import { DataValueFactory } from './data/DataValueFactory';

export class ValueDefinition {
  public value: DataValue<any>;

  public description: Map<string, string> = new Map<string, string>();

  constructor(format: DataFormat, value: Object, description: Map<string, string>) {
    this.description = description;
    this.value = DataValueFactory.create(format, value);
  }
}
