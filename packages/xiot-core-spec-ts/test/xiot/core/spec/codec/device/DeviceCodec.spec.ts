import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {DeviceCodec} from "../../../../../../src";
// import { DeviceCodec } from '@/index'

describe('DeviceCodec', () => {
  const files = globSync('./resources/spec/child/*.json')

  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const json = readJsonSync(v)
      const def = DeviceCodec.decode(json)
      if (isEqual(json, DeviceCodec.encode(def))) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(json)).to.equal(JSON.stringify(DeviceCodec.encode(def)))
      }
    })
  })
})
