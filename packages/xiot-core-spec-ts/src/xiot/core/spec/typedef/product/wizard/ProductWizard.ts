import {LifeCycle} from "../../lifecycle/Lifecycle";
import {Creator} from "../../by/Creator";
import {Updater} from "../../by/Updater";

export class ProductWizardStep {

  constructor(
    public index: number = 0,
    public image: string = '',
    public description: string = '',
  ) {
  }
}

export class ProductWizard {
  constructor(
    public steps: ProductWizardStep[] = [],
    public lifecycle: LifeCycle = LifeCycle.DEVELOPMENT,
    public creator: Creator | null = null,
    public updater: Updater | null = null,
  ) {
  }
}
