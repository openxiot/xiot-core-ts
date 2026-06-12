import {LifeCycle} from "../../lifecycle/Lifecycle";
import {Creator} from "../../by/Creator";
import {Updater} from "../../by/Updater";
import {GenericVersion} from "../../version/GenericVersion";
import {Urn} from "../../definition/urn/Urn";

export class ProductPanelWeb {
  constructor(
    public format: string,
    public url: string,
  ) {
  }
}

export class ProductPanelMiniApp {
  constructor(
    public appId: string,
  ) {
  }
}

export class ProductPanel {
  constructor(
    public status: string,
    public lifecycle: LifeCycle = LifeCycle.DEVELOPMENT,
    public category: string,
    public type: string,
    public web: ProductPanelWeb | null,
    public miniapp: ProductPanelMiniApp | null,
    public version: GenericVersion,
    public instance: Urn,
    public creator: Creator | null = null,
    public updater: Updater | null = null,
  ) {
  }
}
