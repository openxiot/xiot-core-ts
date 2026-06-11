import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SimulatorService } from '../../service/simulator.service'

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html'
})
export class DeviceComponent implements OnInit {
  serialNumber = '1'
  productId = 'aaa'
  productVersion = 1
  deviceType = 'urn:homekit-spec:device:switch:00000008:know:ld01:1'
  cert =
      '-----BEGIN CERTIFICATE-----\n' +
      'MIICpzCCAY8CFBTGDKDGlwn7kBHXgAsWYvGgsLQ2MA0GCSqGSIb3DQEBCwUAMBQx\n' +
      'EjAQBgNVBAMMCWxvY2FsaG9zdDAeFw0yNDAxMDQwOTU2NTRaFw0yNDAyMDMwOTU2\n' +
      'NTRaMAwxCjAIBgNVBAMMAUEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB\n' +
      'AQC8ndiYVCmuaUdDDJcANiL1EG2dH75A7isVfIS5PYwAGm/RT4oB87Id88Sn9NjR\n' +
      'YRQbhuLKYTckGb1Shv12xNwiNvsWIMOMIu2iSCg/a69t+UMwc1Rzq0XitBMYzPt8\n' +
      'PZMHihubtoVDIc4w0/L7MPFc08+CgkSDQj2Gs/2TmxRQx5ibKTaaQQmTp6wO6XjP\n' +
      'YHe0oiCBrhTeLwU7xfJ6KfNZXGjgdSofEqXVGdliOnnAMDmBC3HyDZI/S4njcYGV\n' +
      'hz4+nur3bc38BtAyzUdFh62/lDzZOjiGhwnL0biJeiJd1GOH/s+XZNnm1wSEzRqJ\n' +
      '6gUw4FSQ6lhaVog3oEW6mkOvAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAJP31tMd\n' +
      'tACH/viHkrkuyOaLLqA0GiiCw4VBOVdrkYcLBIfBNugIQJrneJ9ZENxsAKr8tVE7\n' +
      'hoHJH/olJsAErNmYpE7WTf0al+d4Ji1bKCdxeopQV8jBvTgaIVCOdaI3G+xTCkYy\n' +
      'abF4XYkQeGro4iBhqTT7SBVeZeyIybNTVj8oB8ebC49KZeOAt5a0L08ir6D1Kjgt\n' +
      'J1GNzpjfO9V6O6Y4Ln1PmJJOsUxj4YB8R3mHrBuvKgRc6tuQl9juR3AQkx8t4JpX\n' +
      'bfnNBcKHJVnb4DZVWdbFUh6pbs7q2/vvqqwKBf8Z7YuHhqKB+vtqT4gbZKw2Utau\n' +
      '7fQm/leUz+fqV3k=\n' +
      '-----END CERTIFICATE-----'

  key =
      '-----BEGIN PRIVATE KEY-----\n' +
      'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC8ndiYVCmuaUdD\n' +
      'DJcANiL1EG2dH75A7isVfIS5PYwAGm/RT4oB87Id88Sn9NjRYRQbhuLKYTckGb1S\n' +
      'hv12xNwiNvsWIMOMIu2iSCg/a69t+UMwc1Rzq0XitBMYzPt8PZMHihubtoVDIc4w\n' +
      '0/L7MPFc08+CgkSDQj2Gs/2TmxRQx5ibKTaaQQmTp6wO6XjPYHe0oiCBrhTeLwU7\n' +
      'xfJ6KfNZXGjgdSofEqXVGdliOnnAMDmBC3HyDZI/S4njcYGVhz4+nur3bc38BtAy\n' +
      'zUdFh62/lDzZOjiGhwnL0biJeiJd1GOH/s+XZNnm1wSEzRqJ6gUw4FSQ6lhaVog3\n' +
      'oEW6mkOvAgMBAAECggEANH1Az3NsfgryN+iDBR4LsGM3/efdjDg7aSlTzjEgis7Q\n' +
      'm1ElONHWmZtC+PKce/gmHlr1NhjDvZokI5lJZAn4sNTYHxpTEOaPdv/Zo3yWP2aE\n' +
      'mjEeKWpacnJmdhplSffguNJoSHcMstfvh4sULW87W/fd4ZXa9yQx9xCT2sXna2sF\n' +
      'U24DXCpZqEfXTfPnz7UtmURr5VcOeYE46dY4ybCg1jTifjcclb1M9q4rV2YH24Ss\n' +
      'eq6yX2twSTWC8zyKJCXolHsTix8ueJWtggwyuJ8S4nHo/Ac5Fukr9Ce+kHT9Wvi7\n' +
      'NJaKdOJ2ep58haMB1Me12Lw7jiHYJGn/T2wZhhKF4QKBgQDy80iYxm4n8+XyGifn\n' +
      'fqB+eMdKT/u0niEO6L/7N259Co2JSjhtrOywj+VroZfmLkGd89ja67niv3E6ElVn\n' +
      'HM4PXs9gWENP5VeTC0kMGx0jZVmj3JmaE63uGLJyPnfLVzO55YJtqTXcWF4RTFmi\n' +
      '/lS/KUSHCkuYktCMWmY9abI/xwKBgQDGv3CtZ9R75+JMFIvPh/vyoV4QFaNjMKWG\n' +
      'GcQY5Md/iD/4gB7+zJLmiDpS5HchJlkPukt54g8UIgjpQTakMHZNaZlcGgEeRyMK\n' +
      'LVwhuEXwmhzKtJaqUl0YtI7iPLKy4dKEq/pqsoPWNfGmKF8mP4LSFLe7TRtACt6A\n' +
      'r9csXBQs2QKBgQDdchNB7dyKXi3CN0UYJLt1i/FbMvxi7Z+ET3JuMWBsaSoJcbVt\n' +
      'gqlbZk3fhTNHg/IbXyDSqvqMS6ORIxTlH8RTDkBHuSvhr1HbnfW/KxesI71JNtJr\n' +
      'NnTbCXfd2kKm/Z0QXLo96nZFmeZkLgumHdxxQdRMon21XFzrEZsPb0AiEQKBgQCW\n' +
      'uTZVe2mMMhXPRsGkuGbc4X25Sv+myIyu/zlU+6ND12tUJK3c4/3/8I3ysSqbLD7c\n' +
      'i5aTr1lqFkmVw4wRxmLhYFUaoOn6MU6keDPnqpz305hELeIY9u99PekiL5AB0vpY\n' +
      '/Sei5RDQUgaZ0QIfuoiWk3mnBNnGnreQ9kmDba0rOQKBgQC/SLfDmCyE2zFSD+0P\n' +
      'oS+waaYWJiApCA8Zb4mNFw/yZW5O7xFVlUu0K73F4qU2n6vl61NxbudgG74ruSGs\n' +
      'ETVOsMumyfiFWeKrvKa4YZ9lGeSN1J2tWt9xWbSkg1IOtQ5Gu3hfQyRN5FWHPBAE\n' +
      'KM4GVbW6D96YSJUPPQQK/0+n9A==\n' +
      '-----END PRIVATE KEY-----'

  constructor(private router: Router, private route: ActivatedRoute, private simulator: SimulatorService) {}

  ngOnInit(): void {
    if (this.simulator.uninitialized()) {
      this.simulator.initialize(
        this.serialNumber,
        this.productId,
        this.deviceType,
      )
    }
  }

  doConnect() {
    const did = this.serialNumber + '@' + this.productId
    const url = `wss://localhost:9090/${did}/${this.deviceType}`

    this.simulator
      .connect(url, this.key, this.cert)
      .then(x => console.log('connect ok'))
      .catch(e => console.log('connect failed!'))
  }

  doDisconnect() {
    this.simulator.disconnect()
  }
}
