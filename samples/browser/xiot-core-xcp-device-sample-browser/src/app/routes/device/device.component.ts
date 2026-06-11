import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SimulatorService } from '../../service/simulator.service'

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html'
})
export class DeviceComponent implements OnInit {
  serialNumber = '1'
  productId = 30
  productVersion = 1
  deviceType = 'urn:knowin-spec:device:gateway:00000001:know:insight:1'

  constructor(private router: Router, private route: ActivatedRoute, private simulator: SimulatorService) {}

  ngOnInit(): void {
    if (this.simulator.uninitialized()) {
      const deviceLTPK = 'pOuXausrFiOCj5yuDUvS0J+JU9sU8nd+9Fd0DEFPrjI='
      const deviceLTSK = 'OPxtp33FivJCToLFyLHjh3+ERhGnK3fJSBIbm0T+hE0='
      const deviceSeed = 'MC4zODQ5NzA1ODc4Njk1ODA2'
      const serverKey = '/8meBcfecxNl7pMIO0Zxbhx70A4DSGio7C2H7VzZLB8='

      this.simulator.initialize(
        this.serialNumber,
        this.productId,
        this.deviceType,
        serverKey,
        deviceSeed,
        deviceLTPK,
        deviceLTSK
      )
    }
  }

  doConnect() {
    const host = '10.26.21.71'
    const port = 8091
    const uri = '/endpoint'
    this.simulator
      .connect(host, port, uri)
      .then(x => console.log('connect ok'))
      .catch(e => console.log('connect failed!'))

    // this.simulator.test();
  }

  doDisconnect() {
    this.simulator.disconnect()

    // this.simulator.cancelTest();
  }
}
