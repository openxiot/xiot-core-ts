import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {EventDefinitionCodec} from "../../../../../../src";
// import { EventDefinitionCodec } from '@/index'

describe('EventDefinitionCodec', () => {
  const files = globSync('./resources/spec/definition/events/**/*.json')

  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const json = readJsonSync(v)
      const def = EventDefinitionCodec.decode(json)
      if (isEqual(json, EventDefinitionCodec.encode(def))) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(json)).to.equal(JSON.stringify(EventDefinitionCodec.encode(def)))
      }
    })
  })
})
