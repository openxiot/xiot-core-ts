import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {OwnerNoticeCodec} from "../../../../../../src";
// import { OwnerNoticeCodec } from '@/index'

describe('OwnerNoticeCodec', () => {
  const codec = new OwnerNoticeCodec()

  const files = globSync('./resources/spec/notice/owner/space/*.json')

  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const oldObject = readJsonSync(v)
      const { type, payload } = oldObject
      const notice = codec.decode(type, payload)
      if (notice == null) {
        expect(true).to.equal(false)
        return
      }
      const newPayload = codec.encode(notice)
      if (isEqual(payload, newPayload)) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(payload)).to.equal(JSON.stringify(newPayload))
      }
    })
  })
})
