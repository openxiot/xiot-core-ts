import { Component } from '@angular/core'
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'xiot-core-xcp-browser-sample-app'
  version: string = environment.VERSION
}
