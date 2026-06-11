/**
 * curve25519生成相同的shareKey;  ed25519用于签名和校验
 */
import { expect } from 'chai';
import 'mocha';
import { Ed25519 } from 'mipher-ts';
import {Base642Bin, StringToUint8Array} from "../../../../src";;

describe('ed25519', () => {
  it('sign and verify by Ed25519', () => {
    // 来自后端的device LT keys
    const DEVICE_LTPK: Uint8Array = Base642Bin('pOuXausrFiOCj5yuDUvS0J+JU9sU8nd+9Fd0DEFPrjI=');
    const DEVICE_LTSK: Uint8Array = Base642Bin('MC4zODQ5NzA1ODc4Njk1ODA2');

    const INFO: Uint8Array = StringToUint8Array('right message');
    const ERROR: Uint8Array = StringToUint8Array('error');

    const ed = new Ed25519();
    const signature: Uint8Array = ed.sign(INFO, DEVICE_LTSK, DEVICE_LTPK);
    const verifyResult = ed.verify(INFO, DEVICE_LTPK, signature);
    expect(verifyResult).to.equal(true);

    const errorVerify = ed.verify(ERROR, DEVICE_LTPK, signature);
    expect(errorVerify).to.equal(false);
  });
})
