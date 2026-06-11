import { expect } from 'chai';
import { Server } from './impl/XcpClientVerifierImpl/Server';
import { Device } from './impl/XcpClientVerifierImpl/Device';
import { XcpLTSKGetterImpl } from './impl/XcpClientVerifierImpl/XcpLTSKGetterImpl';
import {Base642Bin, Bin2Base64, KeyPair} from "../../../../src";

/**
 * 服务端与设备端进行公钥私钥验证签名
 * @param server  服务端
 * @param device  设备端
 */
async function test(server: Server, device: Device) {
  const start = device.startVerify();
  const answerStart = await server.answerStart(start);
  const res = await device.finishVerify(answerStart);
  const answerFinish = await server.answerFinish(res);

  const msg = device.getFinishAnswer(answerFinish);
  console.log(0, msg);
  return msg;
}

describe('client and server connect', () => {
  it('verify', async () => {
    try {
      const deviceKeyPair = new XcpLTSKGetterImpl().getTypeKeyPair();
      console.log('device public key  : ', Bin2Base64(deviceKeyPair.pk));
      console.log('device private key : ', Bin2Base64(deviceKeyPair.sk));
      const serverPk = Base642Bin('/8meBcfecxNl7pMIO0Zxbhx70A4DSGio7C2H7VzZLB8=');
      const serverSeed = Base642Bin('DNoF+1aAln/zwDTGX4GRjfGsQd6/C8XC2m5ybjyQQ3E=');

      const serverKeyPair = new KeyPair(serverSeed, serverPk, serverSeed);
      console.log('server public key  : ', Bin2Base64(serverKeyPair.pk));
      console.log('server private key : ', Bin2Base64(serverKeyPair.sk));
      const server = new Server(serverKeyPair);
      const device = new Device(serverPk, deviceKeyPair);
      const res = await test(server, device);
      expect(res).to.equal('success');
    } catch (err) {
      expect(err).to.equal(null);
    }
  })
})
