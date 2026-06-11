import { Component, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { Service, Property, Event } from '@loach/xiot-core-spec-ts'
import { HttpClient } from '@angular/common/http'
import { SimulatorService } from '../../../service/simulator.service'

@Component({
  selector: 'app-device-simulator',
  templateUrl: './simulator.component.html'
})
export class SimulatorComponent implements OnInit {
  private route$: Subscription
  serialNumber = ''
  productId = 0
  productVersion = 0
  deviceType = 'urn:knowin-spec:device:gateway:00000001:know:insight:1'

  constructor(
    public msg: NzMessageService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private simulator: SimulatorService
  ) {}

  ngOnInit(): void {
    this.route$ = this.route.params.subscribe(res => {
      this.serialNumber = res.serialNumber || 'null'
      this.productId = Number.parseInt(res.productId || '0', 10)
      this.productVersion = Number.parseInt(res.productVersion || '0', 10)
      this.initializeSimulator()
    })
  }

  private initializeSimulator(): void {
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

  notifyAllProperties(service: Service) {
    this.simulator.notifyService(service.iid)
  }

  notifyProperty(s: Service, p: Property) {
    console.log(p.type.name + ' => currentStringValue: ', p.value._currentStringValue)
    this.simulator.notifyProperty(s.iid, p.iid)
  }

  notifyEvent(s: Service, e: Event) {
    this.simulator.sendEvent(s.iid, e.iid)
  }

  disconnect() {
    this.simulator.disconnect()
  }

  connect() {
    const host = '10.26.21.71'
    const port = 8091
    const uri = '/endpoint'
    this.simulator
      .connect(host, port, uri)
      .then(x => console.log('connect ok'))
      .catch(e => console.log('connect failed!'))
  }
}
