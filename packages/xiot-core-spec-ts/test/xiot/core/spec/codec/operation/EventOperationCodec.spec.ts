import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {EventOperationCodec} from "../../../../../../src";
// import { EventOperationCodec } from '@/index'

describe('EventOperationCodec.Request', () => {
  const files = globSync('./resources/spec/operation/event/request/*.json')
  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const event = EventOperationCodec.Query.decodeObject(oldObject)
      const newObject = EventOperationCodec.Query.encodeObject(event)
      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})

describe('EventOperationCodec.Response', () => {
  const files = globSync('./resources/spec/operation/event/response/*.json')
  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const event = EventOperationCodec.Result.decodeObject(oldObject)
      const newObject = EventOperationCodec.Result.encodeObject(event)
      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
