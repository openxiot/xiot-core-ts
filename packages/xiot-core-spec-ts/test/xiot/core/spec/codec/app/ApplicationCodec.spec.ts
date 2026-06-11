import { expect } from 'chai';
import 'mocha';
import { readJsonSync } from 'fs-extra';
import { sync as globSync } from 'glob';
import { isEqual } from 'lodash';
import { ApplicationCodec } from "../../../../../../src";

describe('ApplicationCodec', () => {
  const files = globSync('./resources/spec/app/*.json');

  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const json = readJsonSync(v);
      const def = ApplicationCodec.decode(json);
      if (isEqual(json, ApplicationCodec.encode(def))) {
        expect(true).to.equal(true);
      } else {
        expect(JSON.stringify(json)).to.equal(JSON.stringify(ApplicationCodec.encode(def)));
      }
    });
  });
});
