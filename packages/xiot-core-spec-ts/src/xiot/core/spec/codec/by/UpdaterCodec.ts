import {Updater} from "../../typedef/by/Updater";

export class UpdaterCodec {
  static encode(x: Updater): any {
    return {
      id: x.id,
      name: x.name,
      timestamp: x.timestamp
    };
  }

  static decode(o: any): Updater | null {
    if (o) {
      return new Updater(
        o.id || '',
        o.name || '',
        o.timestamp || 0
      );
    }

    return null;
  }
}
