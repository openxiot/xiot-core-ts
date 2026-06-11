import { IotService } from './iot/iot.service'
import { Md5 } from 'ts-md5'
const qrcode = require('qrcode-terminal')

/**
 * init device information 生产环境的
 */
const serialNumber = '1'
const productId = '35'
const productVersion = 1
const deviceType = 'urn:homekit-spec:device:lightbulb:00000005:smarthome:bai:1'
const deviceLTPK = 'dGnrV8Hs+Z0JUg2QwNLZP/oGiUGiJ8OgCSmCX7juG0A='
const deviceLTSK = 'yNFU7B5jejb93QBF/w9rt2bv+UvGK/6570Srp+cwok0='
const deviceSeed = '/bIPR3NPAHj7nX+zJzpZP9oeb2NZFH4SAUUh3dqp6YI='
const serverKey = '/8meBcfecxNl7pMIO0Zxbhx70A4DSGio7C2H7VzZLB8='

/**
 * init iot service
 */
console.log('initialize iot.service ...')
const iot = new IotService(serialNumber, productId, deviceType, deviceSeed, deviceLTPK, deviceLTSK, serverKey)

/**
 * connect to service
 */
// test 需要连接vpn
// const host = '10.26.21.71';
// const port = 8091;

// dev 需要连接vpn
// const host = '10.26.29.163';
// const port = 8090;

// 线上
const host = 'localhost'
const port = 8089
const uri = '/endpoint'
iot
  .connect(host, port, uri)
  .then(() => {
    console.log('connect ok')
    iot.getAccessKey().then(key => {
      console.log('DID: ', serialNumber + '@' + productId)
      console.log('AccessKey: ', key)

      const code = {
        id: serialNumber + '@' + productId,
        key: Md5.hashStr(key)
      }

      console.log('code: ', code)
      qrcode.generate(JSON.stringify(code))
    })
  })
  .catch(e => console.log('connect failed!', e))

// iot.sendEvent(siid, eiid);
// iot.notifyProperty(siid, piid);
// iot.notifyService(siid);
