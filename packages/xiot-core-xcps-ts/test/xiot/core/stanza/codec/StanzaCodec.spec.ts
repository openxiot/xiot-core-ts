import 'mocha';
import {expect} from 'chai';
import {readFileSync} from 'fs';
import {readJsonSync} from 'fs-extra';
import {sync as globSync} from 'glob';
import {StanzaCodec} from "../../../../../src";
import {isEqual} from 'lodash';

describe('StanzaCodec', () => {
    const files = globSync('./resources/stanza/**/*.json');

    files.forEach((v: string) => {
        it(`check: ${v}`, () => {
            const oldObject = readJsonSync(v);
            const codec: StanzaCodec = new StanzaCodec();
            const stanza = codec.decode(readFileSync(v).toString());
            const newObject = codec.encode(stanza);
            if (isEqual(oldObject, newObject)) {
                expect(true).to.equal(true);
            } else {
                expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject));
            }
        });
    })
})
