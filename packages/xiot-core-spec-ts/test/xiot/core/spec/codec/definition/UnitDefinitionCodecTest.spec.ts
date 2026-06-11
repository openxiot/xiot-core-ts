import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {UnitDefinitionCodec} from "../../../../../../src";
// import { UnitDefinitionCodec } from '@/index'

describe('UnitDefinitionCodec', () => {
  const files = globSync('./resources/spec/definition/units/**/*.json')

  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const json = readJsonSync(v)
      const def = UnitDefinitionCodec.decode(json)
      if (isEqual(json, UnitDefinitionCodec.encode(def))) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(json)).to.equal(JSON.stringify(UnitDefinitionCodec.encode(def)))
      }
    })
  })
})
