import {Creator} from "../../by/Creator";
import {Updater} from "../../by/Updater";

export class ProductFirmware {
  constructor(
    public name: string = '',
    public description: string = '',
    public type: string = '',
    public creator: Creator | null = null,
    public updater: Updater | null = null,
  ) {
  }
}
