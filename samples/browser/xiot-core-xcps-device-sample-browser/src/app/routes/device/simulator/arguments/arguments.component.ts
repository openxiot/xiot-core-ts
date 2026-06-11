import { Component, Input, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { Service, Argument } from '@gkct/xiot-core-spec-ts'

@Component({
  selector: 'app-simulator-arguments',
  templateUrl: './arguments.component.html'
})
export class SimulatorArgumentsComponent implements OnInit {
  @Input() title = ''
  @Input() service: Service = null
  @Input() arguments: Argument[] = []

  constructor(public msg: NzMessageService) {}

  ngOnInit(): void {}
}
