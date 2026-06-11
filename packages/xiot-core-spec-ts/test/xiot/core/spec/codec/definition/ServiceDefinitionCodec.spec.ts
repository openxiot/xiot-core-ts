import { expect } from 'chai'
import 'mocha'
import { readJsonSync } from 'fs-extra'
import { sync as globSync } from 'glob'
import { isEqual } from 'lodash'
import {ServiceDefinitionCodec} from "../../../../../../src";
// import { ServiceDefinitionCodec } from '@/index'

describe('ServiceDefinitionCodec', () => {
  const files = globSync('./resources/spec/definition/services/**/*.json')

  files.forEach((v: string) => {
    it(`check: ${v}`, () => {
      const json = readJsonSync(v)
      const def = ServiceDefinitionCodec.decode(json)
      if (isEqual(json, ServiceDefinitionCodec.encode(def))) {
        expect(true).to.equal(true)
      } else {
        expect(JSON.stringify(json)).to.equal(JSON.stringify(ServiceDefinitionCodec.encode(def)))
      }
    })
  })
})
