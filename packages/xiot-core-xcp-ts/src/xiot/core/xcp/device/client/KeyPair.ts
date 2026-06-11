export class KeyPair {

  public seed: Uint8Array;

  public pk: Uint8Array;

  public sk: Uint8Array;

  constructor(seed: Uint8Array, pk: Uint8Array, sk: Uint8Array) {
    this.seed = seed;
    this.pk = pk;
    this.sk = sk;
  }
}
