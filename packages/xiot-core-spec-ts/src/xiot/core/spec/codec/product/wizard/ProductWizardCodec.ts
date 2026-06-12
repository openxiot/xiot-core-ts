import {ProductWizard, ProductWizardStep} from '../../../typedef/product/wizard/ProductWizard';
import {LifeCycle, LifeCycleFromString} from "../../../typedef/lifecycle/Lifecycle";
import {CreatorCodec} from "../../by/CreatorCodec";
import {UpdaterCodec} from "../../by/UpdaterCodec";

class ProductWizardStepCodec {
  static encode(x: ProductWizardStep): any {
    return {
      index: x.index,
      image: x.image,
      description: x.description,
    }
  }

  static decode(x: any): ProductWizardStep {
    if (x) {
      return new ProductWizardStep(
        x.index || 0,
        x.image || '',
        x.description || '',
      );
    }

    return new ProductWizardStep();
  }

  static encodeArray(arr: ProductWizardStep[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): ProductWizardStep[] {
    const list: ProductWizardStep[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.decode(o));
      }
    }
    return list;
  }
}

export class ProductWizardCodec {

  static encode(x: ProductWizard): any {
    let o: any = {
      lifecycle: x.lifecycle.toString(),
      steps: ProductWizardStepCodec.encodeArray(x.steps),
    };

    if (x.creator) {
      o.creator = CreatorCodec.encode(x.creator);
    }

    if (x.updater) {
      o.updater = UpdaterCodec.encode(x.updater);
    }

    return o;
  }

  static decode(o: any): ProductWizard {
    const x: ProductWizard = new ProductWizard();

    if (o) {
      x.lifecycle = LifeCycleFromString(o.lifecycle || LifeCycle.DEVELOPMENT);
      x.steps = ProductWizardStepCodec.decodeArray(o.steps);

      if (o.creator) {
        x.creator = CreatorCodec.decode(o.creator);
      }

      if (o.updater) {
        x.updater = UpdaterCodec.decode(o.updater);
      }
    }

    return x;
  }

  static encodeArray(arr: ProductWizard[]): any[] {
    const list: any[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.encode(o));
      }
    }
    return list;
  }

  static decodeArray(arr: any[]): ProductWizard[] {
    const instances: ProductWizard[] = [];
    if (arr?.length) {
      for (const o of arr) {
        instances.push(this.decode(o));
      }
    }
    return instances;
  }
}
