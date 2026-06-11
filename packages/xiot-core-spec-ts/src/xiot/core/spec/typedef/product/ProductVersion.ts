import {DeviceType} from '../definition/urn/DeviceType';
import {LifeCycle} from "../lifecycle/Lifecycle";
import {DeviceInstance} from "../instance/DeviceInstance";

export class ProductVersion {

  version: number = 0;

  lifecycle: LifeCycle = LifeCycle.DEVELOPMENT;

  productId: string = '';

  type!: DeviceType;

  instance!: DeviceInstance;

  ltpk!: string;

  ltsk!: string;

  seed!: string;

  createAt!: Date;

  updateAt!: Date;

  public createAtString(): string {
    if (this.createAt === undefined) {
      return '';
    }

    return `${this.createAt.getFullYear()}-${this.createAt.getMonth() + 1}-${this.createAt.getDate()} ${this.createAt.getHours()}:${this.createAt.getMinutes()}`;
  }

  public updateAtString(): string {
    if (this.updateAt === undefined) {
      return '';
    }

    return `${this.updateAt.getFullYear()}-${this.updateAt.getMonth() + 1}-${this.updateAt.getDate()} ${this.updateAt.getHours()}:${this.updateAt.getMinutes()}`;
  }
}
