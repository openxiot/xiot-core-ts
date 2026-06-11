import {Base642Bin, KeyPair, XcpDeviceLTSKGetter} from "../../../../../../src";

export class XcpLTSKGetterImpl implements XcpDeviceLTSKGetter {
  private readonly keyPair: KeyPair;

  constructor() {
    const deviceSeed = 'MC40NzA0NTk5MjQxMTM5OTQwNw==';
    const deviceLTPK = 'hM0o6sO28qpzEb7C7W1a9TQyqFuExgfjUaNbDiOdH0k=';
    const deviceLTSK = 'MC40NzA0NTk5MjQxMTM5OTQwNw==';
    this.keyPair = new KeyPair(Base642Bin(deviceSeed), Base642Bin(deviceLTPK), Base642Bin(deviceLTSK));
  }

  getDeviceKeypair(): KeyPair {
    return this.keyPair;
  }

  getTypeKeyPair(): KeyPair {
    return this.keyPair;
  }
}
