import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {ProductControllerCodec} from "../../../../../../../src";

describe('ProductControllerCodec', () => {
  const files = globSync('./resources/spec/product/controller/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const controller = ProductControllerCodec.decode(oldObject)

      const newObject = ProductControllerCodec.encode(controller)

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
