/**
 * curve25519生成相同的shareKey;  ed25519用于签名和校验
 */
import { expect } from 'chai';
import 'mocha';
import { Curve25519 } from 'mipher-ts';
import {Base642Bin, Bin2Base64, StringToUint8Array} from "../../../../src";;

describe('curve25519', () => {
  it('generate shareKey by server and client are same by Curve25519', () => {
    // 由后端随机生成
    const SERVER_PK: Uint8Array = Base642Bin('MMLt6ID9L0QxPbj1Xj30K5No2zKHGAR9wm5dlk+X70Q=');
    const SERVER_SK: Uint8Array = Base642Bin('ON6QLZmKO9GWoe9OwiBBCMd5lz/uZyFS7rJV8A/2tlY=');

    const c = new Curve25519();
    // const seed = new Random().get(32); // 这里会导致mocha无法自动退出
    const seed: Uint8Array = StringToUint8Array(new Array(32).fill('s').join(''));
    const { pk: clientPk, sk: clientSk } = c.generateKeys(seed);
    const clientSharedKey: Uint8Array = c.scalarMult(clientSk, SERVER_PK);
    const serverSharedKey: Uint8Array = c.scalarMult(SERVER_SK, clientPk);

    const base64Ck: string = Bin2Base64(clientSharedKey);
    const base64Sk: string = Bin2Base64(serverSharedKey);
    console.log(base64Ck, base64Sk);
    expect(base64Ck).to.equal(base64Sk);
  });
})
