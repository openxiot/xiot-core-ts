import { IotService } from './iot/iot.service'
import { Md5 } from 'ts-md5'
const qrcode = require('qrcode-terminal')

/**
 * init device information
 */
const serialNumber = 'wwwww'
const productId = 28
const productVersion = 1
const deviceType = 'urn:xiot-spec:device:fan:11111111:allperm:123:1'
const deviceLTPK = 'PJlZDoKhft6Engik2DY7vhS2rYm7TP5oiQm3Fm17nck='
const deviceLTSK = 'ILHqb1HzdxFbVZQQ6o6ucYhg2NHXVNfa749Pi7JDa3o='
const deviceSeed = 'MC45NDQyNjEzODQ1MTgyMTg0'
const serverKey = '/8meBcfecxNl7pMIO0Zxbhx70A4DSGio7C2H7VzZLB8='

/**
 * init iot service
 */
console.log('initialize iot.service ...')
const iot = new IotService(serialNumber, productId, deviceType, deviceSeed, deviceLTPK, deviceLTSK, serverKey)

/**
 * connect to service
 */
// test
// const host = '10.26.21.71';
// const port = 8091;

// dev
const host = '10.26.29.163'
const port = 8090
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
