import {Creator} from "../../typedef/by/Creator";

export class CreatorCodec {
  static encode(x: Creator): any {
    return {
      id: x.id,
      name: x.name,
      timestamp: x.timestamp
    };
  }

  static decode(o: any): Creator | null {
    if (o) {
      return new Creator(
        o.id || '',
        o.name || '',
        o.timestamp || 0
      );
    }

    return null;
  }}
