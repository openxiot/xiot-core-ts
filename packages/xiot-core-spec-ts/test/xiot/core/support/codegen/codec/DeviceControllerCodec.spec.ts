import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {DeviceControllerCodec, DeviceInstanceCodec} from "../../../../../../src";

describe('DeviceControllerCodec', () => {
  const files = globSync('./resources/spec/instance/device/**/*.json')

  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const oldJsonObject = readJsonSync(v)
      const device = DeviceControllerCodec.decode(oldJsonObject)
      const newJsonObject = DeviceInstanceCodec.encode(device);
      if (isEqual(oldJsonObject, newJsonObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldJsonObject)).to.equal(JSON.stringify(newJsonObject))
      }
    })
  })
})
