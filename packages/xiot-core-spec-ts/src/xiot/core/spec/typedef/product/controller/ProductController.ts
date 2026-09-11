import {LifeCycle} from "../../lifecycle/Lifecycle";
import {Creator} from "../../by/Creator";
import {Updater} from "../../by/Updater";
import {GenericVersion} from "../../version/GenericVersion";
import {Urn} from "../../definition/urn/Urn";

// 产品控制页：格式为 html 或 zip
export class ProductControllerWeb {
  constructor(
    public format: string,
    public url: string,
  ) {
  }
}

// 产品控制页
export class ProductController {
  constructor(
    public lifecycle: LifeCycle = LifeCycle.DEVELOPMENT,
    public category: string,
    public type: string,
    public web: ProductControllerWeb | null,
    public version: GenericVersion,
    public instance: Urn,
    public creator: Creator | null = null,
    public updater: Updater | null = null,
  ) {
  }
}
