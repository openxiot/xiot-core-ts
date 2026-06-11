export class DeviceCert {

  constructor(
    public productId: string,
    public serialNumber: string,
    public cert: string,
    public key: string
  ) {
  }
}
