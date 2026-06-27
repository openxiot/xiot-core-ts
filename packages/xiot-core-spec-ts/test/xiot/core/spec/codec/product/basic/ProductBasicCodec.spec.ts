import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {ProductBasicCodec} from "../../../../../../../src";

describe('ProductBasicCodec', () => {
  const files = globSync('./resources/spec/product/basic/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const products = ProductBasicCodec.decodeArray(oldObject.products)

      const newObject = { products: ProductBasicCodec.encodeArray(products) }

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
