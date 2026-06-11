import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {PropertyDefinitionCodec} from "../../../../../../src";
// import { PropertyDefinitionCodec } from '@/index'

describe('PropertyDefinitionCodec', () => {
  const files = globSync('./resources/spec/definition/properties/**/*.json')

  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const json = readJsonSync(v)
      const def = PropertyDefinitionCodec.decode(json)
      if (isEqual(json, PropertyDefinitionCodec.encode(def))) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(json)).to.equal(JSON.stringify(PropertyDefinitionCodec.encode(def)))
      }
    })
  })
})
