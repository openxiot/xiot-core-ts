import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {DeviceDefinitionCodec} from "../../../../../../src";
// import { DeviceDefinitionCodec } from '@/index'

describe('DeviceDefinitionCodec', () => {
  const files = globSync('./resources/spec/definition/devices/**/*.json')

  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const json = readJsonSync(v)
      const def = DeviceDefinitionCodec.decode(json)
      if (isEqual(json, DeviceDefinitionCodec.encode(def))) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(json)).to.equal(JSON.stringify(DeviceDefinitionCodec.encode(def)))
      }
    })
  })
})
