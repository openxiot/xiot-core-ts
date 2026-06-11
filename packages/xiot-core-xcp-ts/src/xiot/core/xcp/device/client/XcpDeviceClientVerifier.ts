import { XcpSessionKey } from './common/XcpSessionKey';

export interface XcpDeviceClientVerifier {
  start(): Promise<XcpSessionKey>;
}
