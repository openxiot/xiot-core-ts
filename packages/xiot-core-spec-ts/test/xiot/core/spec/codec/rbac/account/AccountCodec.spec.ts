import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {AccountCodec} from '../../../../../../../src';

describe('AccountCodec', () => {
  const files = globSync('./resources/spec/rbac/account/*.json')

  files.forEach((v: string) => {
    it(`decode: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const accounts = AccountCodec.decodeArray(oldObject.accounts)
      const newObject = { accounts: AccountCodec.encodeArray(accounts) }

      if (isEqual(oldObject, newObject)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(oldObject)).to.equal(JSON.stringify(newObject))
      }
    })
  })
})
