import { expect } from 'chai';
import 'mocha';
import { readJsonSync } from 'fs-extra';
import { sync as globSync } from 'glob';
import { isEqual } from 'lodash';
import { ActionDefinitionCodec } from '../../../../../../src';

describe('ActionDefinitionCodec', () => {
  const files = globSync('./resources/spec/definition/actions/**/*.json');

  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const json = readJsonSync(v);
      const def = ActionDefinitionCodec.decode(json);
      if (isEqual(json, ActionDefinitionCodec.encode(def))) {
        expect(true).to.equal(true);
      } else {
        expect(JSON.stringify(json)).to.equal(JSON.stringify(ActionDefinitionCodec.encode(def)));
      }
    });
  });
});
