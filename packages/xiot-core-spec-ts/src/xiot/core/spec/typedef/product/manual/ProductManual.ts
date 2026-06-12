import {LifeCycle} from "../../lifecycle/Lifecycle";
import {Creator} from "../../by/Creator";
import {Updater} from "../../by/Updater";

export class ProductManualPage {

  constructor(
    public index: number = 0,
    public url: string = '',
  ) {
  }
}

export class ProductManual {
  constructor(
    public pages: ProductManualPage[] = [],
    public lifecycle: LifeCycle = LifeCycle.DEVELOPMENT,
    public creator: Creator | null = null,
    public updater: Updater | null = null,
  ) {
  }
}
