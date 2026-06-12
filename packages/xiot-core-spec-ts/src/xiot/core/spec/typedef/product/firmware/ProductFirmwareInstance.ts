import {GenericVersion} from "../../version/GenericVersion";
import {LifeCycle} from "../../lifecycle/Lifecycle";
import {Creator} from "../../by/Creator";
import {Updater} from "../../by/Updater";

export class FirmwareSample {
  constructor(
    public memo: string,
    public url: string,
    public size: number,
    public md5: string,
  ) {
  }
}

export class ProductFirmwareInstance {
  constructor(
    public lifecycle: LifeCycle,
    public version: GenericVersion,
    public minUpgradeVersionCode: number,
    public type: string,
    public simple: FirmwareSample | null = null,
    public creator: Creator | null = null,
    public updater: Updater | null = null,
  ) {
  }
}
