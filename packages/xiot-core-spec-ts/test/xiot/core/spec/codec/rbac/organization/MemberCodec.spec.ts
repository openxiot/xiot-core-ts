import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {MemberCodec} from "../../../../../../../src/xiot/core/spec/codec/rbac/organization/MemberCodec";

describe('MemberCodec', () => {
  const files = globSync('./resources/spec/rbac/organization/member/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const members = MemberCodec.decodeArray(oldObject.members)
      const newObject = { members: MemberCodec.encodeArray(members) }

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
