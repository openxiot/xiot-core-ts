import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {PermissionCodec} from "../../../../../../src/xiot/core/spec/codec/rbac/PermissionCodec";

describe('PermissionCodec', () => {
  const files = globSync('./resources/spec/rbac/permission/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const permissions = PermissionCodec.decodeArray(oldObject.permissions)
      const newObject = { permissions: PermissionCodec.encodeArray(permissions) }

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
