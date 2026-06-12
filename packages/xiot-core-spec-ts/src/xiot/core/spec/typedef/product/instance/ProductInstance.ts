import {LifeCycle} from "../../lifecycle/Lifecycle";
import {Urn} from "../../definition/urn/Urn";
import {Creator} from "../../by/Creator";
import {Updater} from "../../by/Updater";

export class ProductInstance {
  constructor(
    public lifecycle: LifeCycle = LifeCycle.DEVELOPMENT,
    public type: Urn | null = null,
    public creator: Creator | null = null,
    public updater: Updater | null = null
  ) {
  }
}
