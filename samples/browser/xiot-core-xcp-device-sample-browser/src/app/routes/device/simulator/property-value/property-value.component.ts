import { Component, Input, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { Property, DataValueFactory } from '@loach/xiot-core-spec-ts'

@Component({
  selector: 'app-simulator-property-value',
  templateUrl: './property-value.component.html'
})
export class SimulatorPropertyValueComponent implements OnInit {
  @Input() showTitle: boolean
  @Input() p: Property

  constructor(public msg: NzMessageService) {}

  ngOnInit(): void {}

  setStringValue(value: string) {
    const v = DataValueFactory.createFromString(this.p.format, value)
    this.p.setValue(v.getObjectValue())
  }

  setValue(value: any) {
    console.log('setValue: typeof value => ', typeof value)
    console.log('format => ', this.p.format.toString())
    console.log('value => ', value)
    this.p.setValue(value)
  }
}
