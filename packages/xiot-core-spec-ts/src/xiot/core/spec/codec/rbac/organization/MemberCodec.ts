import {Member} from '../../../typedef/rbac/organization/Member';

export class MemberCodec {
  static decodeArray(array: any[]): Member[] {
    if (array != null) {
      if (array.length > 0) {
        return array.map(x => MemberCodec.decode(x));
      }
    }

    return [];
  }

  static decode(x: any): Member {
    return new Member(x.organizationId, x.accountId, x.status, x.role);
  }

  static encode(x: Member): {} {
    return {
      organizationId: x.organizationId,
      accountId: x.accountId,
      status: x.status,
      role: x.role
    };
  }

  static encodeArray(Members: Member[]): any[] {
    if (Members != null) {
      if (Members.length > 0) {
        return Members.map(x => MemberCodec.encode(x));
      }
    }

    return [];
  }
}
