/* eslint-disable consistent-return */

import { ChaCha20Poly1305 } from '@stablelib/chacha20poly1305';
import { Curve25519, Ed25519 } from 'mipher-ts';
import { XcpLTSKGetterImpl } from './XcpLTSKGetterImpl';
import { getKeyPair } from './util';
import {
  Base642Bin,
  Bin2Base64,
  BytesJoin,
  KeyPair, StringToUint8Array,
  XcpDeviceClientCipher,
  XcpDeviceClientCipherProductImpl,
  XcpKeyCreator,
  XcpKeyType
} from "../../../../../../src";;

export class Device {
  private deviceId = '1@35';

  private deviceType = 'urn:homekit-spec:device:switch:00000008:allpermgroup:ld02:1';

  private deviceLocalKeyPair: KeyPair;

  private cipher: XcpDeviceClientCipher;

  private getter: XcpLTSKGetterImpl;

  constructor(serverLTPK: Uint8Array, deviceLocalKeyPair: KeyPair) {
    // 这个参数怎么样可以初始化成null。。。。。
    this.deviceLocalKeyPair = deviceLocalKeyPair;
    this.getter = new XcpLTSKGetterImpl();
    this.cipher = new XcpDeviceClientCipherProductImpl(this.deviceType, this.getter, serverLTPK);
  }

  startVerify(): Map<string, string> {
    console.log('---------startVerify--------');
    const result = new Map<string, string>();
    this.deviceLocalKeyPair = getKeyPair();
    console.log(`device publicKey: ${Bin2Base64(this.deviceLocalKeyPair.pk)}`);
    result.set('publicKey', Bin2Base64(this.deviceLocalKeyPair.pk));
    return result;
  }

  finishVerify(input: Map<string, string>): Promise<Map<string, string>> {
    return new Promise<Map<string, string>>((resolve, reject) => {
      const result = new Map<string, string>();
      console.log('---------finishVerify--------');

      const serverPk = input.get('serverPublicKey');
      if (typeof serverPk === 'undefined') {
        return result;
      }

      const serverPublicKey = Base642Bin(serverPk);

      const s = input.get('encryptedSignature');
      if (typeof s === 'undefined') {
        return result;
      }

      const encryptedServerSignature = Base642Bin(s);

      const c = new Curve25519();
      const sharedKey = c.scalarMult(this.deviceLocalKeyPair.sk, serverPublicKey);
      console.log(`device sharedKey :${Bin2Base64(sharedKey)}`);

      const verifyKey = XcpKeyCreator.create(sharedKey, XcpKeyType.SESSION_VERIFY_ENCRYPT_KEY);
      if (verifyKey == null) {
        return result;
      }

      console.log(`device vertifyKey = ${Bin2Base64(verifyKey)}`);

      const sessionInfo = BytesJoin(this.deviceLocalKeyPair.pk, serverPublicKey);
      // console.log('SessionInfo: ', Convert.bin2base64(this.sessionInfo));
      console.log('SessionInfo : ', Bin2Base64(sessionInfo));

      const cc = new ChaCha20Poly1305(verifyKey);
      const encryptedDeviceId = cc.seal(StringToUint8Array('SV-Msg03'), StringToUint8Array(this.deviceId));
      const encryptedDeviceType = cc.seal(StringToUint8Array('SV-Msg03'), StringToUint8Array(this.deviceType));
      console.log(`encrypted DeviceId : ${Bin2Base64(encryptedDeviceId)}`);
      console.log(`encrypted DeviceType ： ${Bin2Base64(encryptedDeviceType)}`);

      result.set('encryptedDeviceId', Bin2Base64(encryptedDeviceId));
      result.set('encryptedDeviceType', Bin2Base64(encryptedDeviceType));
      result.set('deviceLtpk', Bin2Base64(this.getter.getDeviceKeypair().pk));

      const serverSignature = cc.open(StringToUint8Array('SV-Msg02'), encryptedServerSignature);
      if (serverSignature == null) {
        console.log('decode serverSignature failed, serverSignature is null');
        reject('decode serverSignature failed, serverSignature is null');
        return;
      }

      console.log(`server serverSignature : ${Bin2Base64(serverSignature)}`);

      if (!this.cipher.verify(sessionInfo, serverSignature)) {
        console.log('server signature verified failed');
        reject('server signature verified failed');
        return;
      }

      const ed = new Ed25519();
      const deviceKeypair = this.getter.getDeviceKeypair();
      const signature = ed.sign(sessionInfo, deviceKeypair.sk, deviceKeypair.pk);
      console.log('device signature: ', Bin2Base64(signature));
      // console.log('device signature: ', Convert.bin2base64(signature));
      const encryptedSignature = cc.seal(StringToUint8Array('SV-Msg03'), signature);
      result.set('encryptedSign', Bin2Base64(encryptedSignature));
      resolve(result);
    });
  }

  getFinishAnswer(input: Map<string, string>) {
    console.log('---------getFinishAnswer--------');
    const msg = input.get('msg');
    console.log(msg);
    return msg;
  }
}
