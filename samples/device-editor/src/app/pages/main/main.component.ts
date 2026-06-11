import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import pkg from '../../../../package.json';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzSpinModule
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent {
  isCollapsed = false;
  version: string = pkg.version;

  constructor() {
  }
}
