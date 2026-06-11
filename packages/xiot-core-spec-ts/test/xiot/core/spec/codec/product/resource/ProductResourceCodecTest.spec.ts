import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {ProductResourceCodec} from "../../../../../../../src";

describe('ResourceCodec', () => {
  const files = globSync('./resources/spec/product/resource/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const res = ProductResourceCodec.decode(oldObject)
      const newObject = ProductResourceCodec.encode(res)

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
