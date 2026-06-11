import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {ShadowCodec} from "../../../../../../src";
// import { ShadowCodec } from '@/index'

describe('ShadowCodec', () => {
  const files = globSync('./resources/spec/shadow/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const shadows = ShadowCodec.decodeArray(oldObject.shadows)
      const newObject = { shadows: ShadowCodec.encodeArray(shadows) }

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
