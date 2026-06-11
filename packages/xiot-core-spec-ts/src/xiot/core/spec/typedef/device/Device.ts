import { Summary } from '../summary/Summary';
import {Somewhere} from "../somewhere/Somewhere";

export class Device {
  did: string;

  summary?: Summary;

  somewhere?: Somewhere;

  token?: string;

  constructor(did: string) {
    this.did = did;
  }
}
