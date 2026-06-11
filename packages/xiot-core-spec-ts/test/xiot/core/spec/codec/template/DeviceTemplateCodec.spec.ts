import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {DeviceTemplateCodec} from "../../../../../../src";
// import { DeviceTemplateCodec } from '@/index'

describe('DeviceTemplateCodec', () => {
  const files = globSync('./resources/spec/template/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const device = DeviceTemplateCodec.decode(oldObject)
      const newObject = DeviceTemplateCodec.encode(device)

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
