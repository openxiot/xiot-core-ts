import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {RoleCodec} from "../../../../../../src/xiot/core/spec/codec/rbac/RoleCodec";

describe('RoleCodec', () => {
  const files = globSync('./resources/spec/rbac/role/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const roles = RoleCodec.decodeArray(oldObject.roles)
      const newObject = { roles: RoleCodec.encodeArray(roles) }

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
