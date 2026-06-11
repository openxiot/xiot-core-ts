import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {ProductCodec} from "../../../../../../src";

describe('ProductCodec', () => {
  const files = globSync('./resources/spec/product/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const products = ProductCodec.decodeArray(oldObject.products)

      const newObject = { products: ProductCodec.encodeArray(products) }

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
