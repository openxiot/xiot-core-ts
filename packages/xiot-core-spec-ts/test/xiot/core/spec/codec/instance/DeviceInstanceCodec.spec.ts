import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {DeviceInstanceCodec} from "../../../../../../src";
// import { DeviceInstanceCodec } from '@/index'

describe('DeviceInstanceCodec', () => {
  const files = globSync('./resources/spec/instance/device/**/*.json')

  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const json = readJsonSync(v)
      const def = DeviceInstanceCodec.decode(json)
      if (isEqual(json, DeviceInstanceCodec.encode(def))) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(json)).to.equal(JSON.stringify(DeviceInstanceCodec.encode(def)))
      }
    })
  })
})
