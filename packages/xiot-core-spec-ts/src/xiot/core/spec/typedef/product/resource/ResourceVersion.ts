import {Version} from "../../version/Version";
import {LifeCycle} from "../../lifecycle/Lifecycle";

export class ResourceVersion {

  version: Version = new Version(0, 0, 0);

  description: Map<string, string> = new Map<string, string>();

  url: string = '';

  size: number = 0;

  md5: string = '';

  lifecycle: LifeCycle = LifeCycle.DEVELOPMENT;

  createBy: string = '';

  updateBy: string = '';

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
