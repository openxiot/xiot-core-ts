import {Urn} from '../definition/urn/Urn';
import {ObjectWithLifecycle} from '../lifecycle/ObjectWithLifecycle';

export class Product {
  id!: string;

  name!: string;

  icon!: string;

  model!: string;

  template!: Urn;

  organization!: string;

  key!: string;

  cert!: string;

  protocol!: string;

  createBy!: string;

  createAt!: Date;

  updateBy!: string;

  updateAt!: Date;

  versions!: Array<ObjectWithLifecycle<Number>>;

  _currentVersion: number = 1;

  get currentVersion(): ObjectWithLifecycle<Number> {
    let index = this.versions.findIndex(x => x.value == this._currentVersion);
    return this.versions[index];
  }

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
