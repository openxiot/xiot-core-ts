import { IotService } from './iot/iot.service'
import { Md5 } from 'ts-md5'
const qrcode = require('qrcode-terminal')

/**
 * init device information 生产环境的
 */
const serialNumber = '1'
const productId = "aaa"
const deviceType = 'urn:homekit-spec:device:lightbulb:00000005:smarthome:bai:0'

const cert =
`
-----BEGIN CERTIFICATE-----
MIICzDCCAbSgAwIBAgIUZp7H/N/A0LDc91p+21k+6gOyCWwwDQYJKoZIhvcNAQEL
BQAwEzERMA8GA1UEAwwIZ2Vla2NpdHkwIBcNMjQwMTI3MDYzOTQwWhgPMjEyNDAx
MDMwNjM5NDBaMCsxKTAnBgNVBAMMIDQwZTEzNmQ2YTU2MTQ3NDc5MDkzZTEwZGI4
YjNlMzYzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjTb2LE9v8A+t
zuhkYkkqolUmATO4TcL7pvHMKPQZlGj4tiIKuSUWpwQETXOr0HY6B4Bzm+volZ/M
n+V7eBHK9OiCsvglrnZjSoxykIG/HislVpKesGljMQyvY0kVR0HILanMJ9J8e5x1
azmlAWin/iE9x3Jw9XU/frnk2mMpSiiZXlT1giQPs6+bL/FbaDCxe5/KiOp/Pc++
GUt79jaMEvUWIx7p5LrM0xOh71XxFU5mPIKp7QjeMff6gvVu0igce0vRPjXf2tPl
+j5t8UdQDtPek4tVvZPXdcMoAX2s7dG08kmChx4P5EqnyYaGSwLdohtz6UlyriBP
nSxlT9dPBwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQCfu+TphkJDP9hcyMwQ4IXD
yHwZe+OuRh1IRbPasSeCfhH1FEmp2/84IyjiACcOifNR/hDNvmplizsktGVotRN9
htxH0Ib4/CBltTjWfyB3NAO3/C35qFRqsTPIwlh2TIFuIVsqH5RSvBqj6WDQH4lj
lb7rCaOQPZjjwGLiIcuZXUSL3ewuXZyug7nF5N9XntYokBvNRLZk06QdC0sKpnHK
htCC/KXX8g5CTg9w1yHwm88Ztl8w/gfBLqG1Wupe/fW6Tsy09ADvTDEWJXrnoAiM
xxOpncaiHIA+vXIl/GWyaMi/U8eM6v+ccZHGI+UpxXWnpoCuTgTIIUCunlU/Fxjl
-----END CERTIFICATE-----
`

const key =
`
-----BEGIN PRIVATE KEY-----
MIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCNNvYsT2/wD63O
6GRiSSqiVSYBM7hNwvum8cwo9BmUaPi2Igq5JRanBARNc6vQdjoHgHOb6+iVn8yf
5Xt4Ecr06IKy+CWudmNKjHKQgb8eKyVWkp6waWMxDK9jSRVHQcgtqcwn0nx7nHVr
OaUBaKf+IT3HcnD1dT9+ueTaYylKKJleVPWCJA+zr5sv8VtoMLF7n8qI6n89z74Z
S3v2NowS9RYjHunkuszTE6HvVfEVTmY8gqntCN4x9/qC9W7SKBx7S9E+Nd/a0+X6
Pm3xR1AO096Ti1W9k9d1wygBfazt0bTySYKHHg/kSqfJhoZLAt2iG3PpSXKuIE+d
LGVP108HAgMBAAECggEAYfrgk54KbOZ0EjvsasWZb0jlNbBNEKdZNFxQ65lypiav
aq/0AMJbFUcUNSks7VcarFnT3TuyBR77O3ZeVNEDoSoyhTrn6kT6X59TXjCoCqal
IYxZzs1QpZfHmXv755Uc75IAtSC2fo3wapV0h6W16f3mf5xIBAd2JteUknJ7E5hP
9wItS9fHzRStelmzXhUD/UamsWFDsDU1frmiffNODUWnPkh0Wn2+jRIGVmAE69Dn
YmVr8e92K1KNkhXkDULuYoY+oO5kG3ElJihymdfyKoyGUHBkkITc66PIm3DiadQB
kEICfVKntKVEixnJ0YChO98zxrwBYpaMQNw2xbFlAQKBgQC/dbLRCj54nCSlkDBM
E3qlF8iFA6P13cX2KlVlw2TcUhagTrSUSQkaTCLjcH0XVPzaRbdeUKjCFHjB4hsF
i38I2NlVgTAqb/yAxgwvCJ8IueID4J/RCo+gK/T9/OEgTI9RQ6yuY+xim0jNrkON
AbrdcsYUAWhHmWBc08bIx/K/1QKBgQC80UqQHztp2IIpmqtdNDxupsxwn1pqSkeK
v6zv33cAR4OL93UJ7TPO7kGGPWpDEz8+NWp4sr2QhkxHA70Z/Xpw7I4KYW4riyZM
wHXYNSnsKNBuQ0a9FSXUSleCHjrq4XLJcg97Uy0lDAq3yPC0lW2ML1S+/n1/OKVh
z3l5wA4dawKBgHNESQPRRwsV9no29NzYXV5Hk1GBf5Tmj+hEVGWP3YlHYpfgypb7
4Z8Td222q5kAcbp3fo4pwXAXIxyXI+2SrkiFRVNVE8p44Wwlz/ABIL4AKzJqac1Q
rmegDz9an67yaNZkB/J19jrngk1SPRkHkZkBIH+q2T1B+eHpHiSDPIKBAn8mWlzK
6Y0n8tJ9oO0uAW5FC5x7Q+MZs/zUMhrunnWNmPkfdSRQ392mKr8khVUQStiNykvW
OHhI4v6bbib7IIG+bk5rzV6TebBN5soJIMNjNOchfojf32vPs0oTJBDTpPer838x
jbOd0tRagHZkN/YIg5SzNv5G2Tq+o2YJVPmJAoGBAJK33VwSckrytS4s1oPEdjUo
/rteGuFL18eIT8mgM03Qybj9xxnfmn8E+WVj8ij6Iw9A9Wgi3Pl/Erc6YWUYtqbk
N91Jk9ljQ+MIyV9Kw93cbYnkzspJedUwpgPqE1tTw7FnhwQsMuw/V5F8E6VO4lMV
LRFDPnLTq23Z8RKyvILS
-----END PRIVATE KEY-----
`

    /**
 * init iot service
 */
console.log('initialize iot.service ...')
const iot = new IotService(serialNumber, productId, deviceType)

/**
 * connect to service
 */
// const did = serialNumber + '@' + productId
// const url = `wss://localhost:9090/${did}/${deviceType}`
const url = 'wss://tiger.geekcity.cn:8088/1@40e136d6a56147479093e10db8b3e363/urn:homekit-spec:device:lightbulb:00000005:smarthome:bai:0'


iot
  .connect(url, key, cert)
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
