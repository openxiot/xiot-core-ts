import {Permission} from '../../typedef/rbac/Permission';

export class PermissionCodec {
  static decodeArray(array: any[]): Permission[] {
    if (array != null) {
      if (array.length > 0) {
        return array.map(x => PermissionCodec.decode(x));
      }
    }

    return [];
  }

  static decode(x: any): Permission {
    return  new Permission(x.id, x.parent_id, x.text, x.code, x.remark);
  }

  static encode(x: Permission): {} {
    return {
      id: x.id,
      parent_id: x.parent_id,
      text: x.text,
      code: x.code,
      remark: x.remark
    };
  }

  static encodeArray(permissions: Permission[]): any[] {
    if (permissions != null) {
      if (permissions.length > 0) {
        return permissions.map(x => PermissionCodec.encode(x));
      }
    }

    return [];
  }
}
