import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {ProductVersionCodec} from "../../../../../../../src";

describe('ProductVersionCodec', () => {
  const files = globSync('./resources/spec/product/version/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const versions = ProductVersionCodec.decodeArray(oldObject.versions)
      const newObject = { versions: ProductVersionCodec.encodeArray(versions) }

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
