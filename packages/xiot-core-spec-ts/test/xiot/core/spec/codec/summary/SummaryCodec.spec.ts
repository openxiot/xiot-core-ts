import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {SummaryCodec} from "../../../../../../src";
// import { SummaryCodec } from '@/index'

describe('SummaryCodec', () => {
  const files = globSync('./resources/spec/summary/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const summaries = SummaryCodec.decodeArray(oldObject.summaries)
      const newObject = { summaries: SummaryCodec.encodeArray(summaries) }

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
