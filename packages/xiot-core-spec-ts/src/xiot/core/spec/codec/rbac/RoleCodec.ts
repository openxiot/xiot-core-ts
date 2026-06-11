import {Role} from '../../typedef/rbac/Role';

export class RoleCodec {
  static decodeArray(array: any[]): Role[] {
    if (array != null) {
      if (array.length > 0) {
        return array.map(x => RoleCodec.decode(x));
      }
    }

    return [];
  }

  static decode(x: any): Role {
    return new Role(x.id, x.parent_id, x.text, x.permission);
  }

  static encode(x: Role): {} {
    return {
      id: x.id,
      parent_id: x.parent_id,
      text: x.text,
      permission: x.permission
    };
  }

  static encodeArray(roles: Role[]): any[] {
    if (roles != null) {
      if (roles.length > 0) {
        return roles.map(x => RoleCodec.encode(x));
      }
    }

    return [];
  }
}
