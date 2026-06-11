import {Organization} from '../../../typedef/rbac/organization/Organization';

export class OrganizationCodec {
  static decodeArray(array: any[]): Organization[] {
    if (array != null) {
      if (array.length > 0) {
        return array.map(x => OrganizationCodec.decode(x));
      }
    }

    return [];
  }

  static decode(x: any): Organization {
    return new Organization(x.id, x.description, x.roles);
  }

  static encode(x: Organization): {} {
    return {
      id: x.id,
      description: x.description,
      roles: x.roles
    };
  }

  static encodeArray(Organizations: Organization[]): any[] {
    if (Organizations != null) {
      if (Organizations.length > 0) {
        return Organizations.map(x => OrganizationCodec.encode(x));
      }
    }

    return [];
  }
}
