import {Account} from '../../../typedef/rbac/account/Account';

export class AccountCodec {
  static decodeArray(array: any[]): Account[] {
    if (array != null) {
      if (array.length > 0) {
        return array.map(x => AccountCodec.decode(x));
      }
    }

    return [];
  }

  static decode(x: any): Account {
    return new Account(
        x.id,
        x.nickname,
        x.avatar,
        x.email,
        x.username,
        x.password,
        x.platformId,
        x.platformAccountId
    );
  }

  static encode(x: Account): {} {
    return {
      id: x.id,
      nickname: x.nickname,
      avatar: x.avatar,
      email: x.email,
      username: x.username,
      password: x.password,
      platformId: x.platformId,
      platformAccountId: x.platformAccountId,
    };
  }

  static encodeArray(accounts: Account[]): any[] {
    if (accounts != null) {
      if (accounts.length > 0) {
        return accounts.map(x => AccountCodec.encode(x));
      }
    }

    return [];
  }
}
