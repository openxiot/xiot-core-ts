import { DeviceType } from './urn/DeviceType';

export class DeviceDefinition {

  category!: string;
  type: DeviceType;

  description: Map<string, string> = new Map<string, string>();

  constructor(category: string, type: DeviceType, description: Map<string, string>) {
    this.category = category;
    this.type = type;

    if (description != null) {
      this.description = description;
    }
  }
}
