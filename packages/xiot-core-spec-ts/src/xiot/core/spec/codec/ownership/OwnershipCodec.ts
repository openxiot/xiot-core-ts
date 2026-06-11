import {Ownership} from '../../typedef/ownership/Ownership';

export class OwnershipCodec {
  static decode(o: any): Ownership {
    const ownership: Ownership = new Ownership();
    ownership.appId = o.appId;
    ownership.ownerId = o.ownerId;
    ownership.did = o.did;
    ownership.token = o.token;
    ownership.cloudId = o.cloudId;
    ownership.rootId = o.rootId;

    if (o.createAt !== undefined) {
      ownership.createAt = new Date(o.createAt);
    }

    if (o.updateAt !== undefined) {
      ownership.updateAt = new Date(o.updateAt);
    }

    return ownership;
  }

  static encode(x: Ownership): any {
    const object: any = {
      appId: x.appId,
      ownerId: x.ownerId,
      did: x.did,
      token: x.token
    };

    if (x.cloudId != null) {
      object.cloudId = x.cloudId;
    }

    if (x.rootId != null) {
      object.rootId = x.rootId;
    }

    if (x.createAt != null) {
      object.createAt = x.createAt.getTime();
    }

    if (x.updateAt != null) {
      object.updateAt = x.updateAt.getTime();
    }

    return object;
  }

  static decodeArray(arr: any[]): Ownership[] {
    const list: Ownership[] = [];
    if (arr?.length) {
      for (const o of arr) {
        list.push(this.decode(o));
      }
    }
    return list;
  }

  static encodeArray(Ownerships: Ownership[]): any[] {
    const arr: any[] = [];
    if (Ownerships?.length) {
      for (const p of Ownerships) {
        arr.push(this.encode(p));
      }
    }
    return arr;
  }
}
