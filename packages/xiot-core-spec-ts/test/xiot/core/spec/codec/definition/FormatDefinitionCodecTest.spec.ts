import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {FormatDefinitionCodec} from "../../../../../../src";
// import { FormatDefinitionCodec } from '@/index'

describe('FormatDefinitionCodec', () => {
  const files = globSync('./resources/spec/definition/formats/**/*.json')

  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const json = readJsonSync(v)
      const def = FormatDefinitionCodec.decode(json)
      if (isEqual(json, FormatDefinitionCodec.encode(def))) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(json)).to.equal(JSON.stringify(FormatDefinitionCodec.encode(def)))
      }
    })
  })
})
