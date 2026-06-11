export class DeviceKey {

  constructor(
    public did: string,
    public ltpk: string,
    public ltsk: string,
    public seed: string,
    public productId: string
  ) {
  }
}
