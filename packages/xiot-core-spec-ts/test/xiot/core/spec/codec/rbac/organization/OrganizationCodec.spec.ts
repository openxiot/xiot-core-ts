import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {OrganizationCodec} from "../../../../../../../src/xiot/core/spec/codec/rbac/organization/OrganizationCodec";

describe('OrganizationCodec', () => {
  const files = globSync('./resources/spec/rbac/organization/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const organizations = OrganizationCodec.decodeArray(oldObject.organizations)
      const newObject = { organizations: OrganizationCodec.encodeArray(organizations) }

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
