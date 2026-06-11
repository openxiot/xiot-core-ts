import { KeyPair } from './KeyPair';

export interface XcpDeviceLTSKGetter {

  getDeviceKeypair(deviceId: string): KeyPair;

  getTypeKeyPair(deviceType: string): KeyPair;
}
