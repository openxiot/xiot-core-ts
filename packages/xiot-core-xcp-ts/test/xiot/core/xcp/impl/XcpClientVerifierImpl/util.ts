import { Curve25519 } from 'mipher-ts';
import {KeyPair, StringToUint8Array} from "../../../../../../src";

export function getKeyPair(): KeyPair {
  const c = new Curve25519();
  const seed = StringToUint8Array(new Array(32).fill('s').join(''));
  const k = c.generateKeys(seed);
  return new KeyPair(seed, k.pk, k.sk);
}
