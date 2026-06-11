import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {ActionOperationCodec} from "../../../../../../src";
// import { ActionOperationCodec } from '@/index'

describe('ActionOperationCodec.Request', () => {
  const files = globSync('resources/spec/operation/action/request/*.json')
  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const actions = ActionOperationCodec.Query.decodeArray(oldObject.actions)
      const newObject = {
        actions: ActionOperationCodec.Query.encodeArray(actions)
      }
      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})

describe('ActionOperationCodec.Response', () => {
  const files = globSync('resources/spec/operation/action/response/*.json')
  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const actions = ActionOperationCodec.Result.decodeArray(oldObject.actions)
      const newObject = {
        actions: ActionOperationCodec.Result.encodeArray(actions)
      }
      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
