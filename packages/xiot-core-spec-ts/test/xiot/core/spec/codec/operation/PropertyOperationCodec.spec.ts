import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {PropertyOperationCodec} from "../../../../../../src";
// import { PropertyOperationCodec } from '@/index'

describe('PropertyOperationCodec.Get.Request', () => {
  const files = globSync('./resources/spec/operation/property/get/request/*.json')
  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const array = PropertyOperationCodec.Get.QUERY.decodeArray(oldObject.properties)
      const newObject = {
        properties: PropertyOperationCodec.Get.QUERY.encodeArray(array)
      }
      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})

describe('PropertyOperationCodec.Get.Response', () => {
  const files = globSync('./resources/spec/operation/property/get/response/*.json')
  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const array = PropertyOperationCodec.Get.RESULT.decodeArray(oldObject.properties)
      const newObject = {
        properties: PropertyOperationCodec.Get.RESULT.encodeArray(array)
      }
      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})

describe('PropertyOperationCodec.Set.Request', () => {
  const files = globSync('./resources/spec/operation/property/set/request/*.json')
  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const array = PropertyOperationCodec.Set.QUERY.decodeArray(oldObject.properties)
      const newObject = {
        properties: PropertyOperationCodec.Set.QUERY.encodeArray(array)
      }
      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})

describe('PropertyOperationCodec.Set.Response', () => {
  const files = globSync('./resources/spec/operation/property/set/response/*.json')
  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const array = PropertyOperationCodec.Set.RESULT.decodeArray(oldObject.properties)
      const newObject = {
        properties: PropertyOperationCodec.Set.RESULT.encodeArray(array)
      }
      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})

describe('PropertyOperationCodec.Notify', () => {
  const files = globSync('./resources/spec/operation/property/notify/*.json')
  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const array = PropertyOperationCodec.Notify.decodeArray(oldObject.properties)
      const newObject = {
        properties: PropertyOperationCodec.Notify.encodeArray(array)
      }
      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
