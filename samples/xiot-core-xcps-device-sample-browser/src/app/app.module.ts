import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'
import { HomeComponent } from './routes/home/home.component'
import { DeviceComponent } from './routes/device/device.component'
import { AboutComponent } from './routes/about/about.component'
import { SimulatorService } from './service/simulator.service'
import { SimulatorComponent } from './routes/device/simulator/simulator.component'
import { SimulatorArgumentsComponent } from './routes/device/simulator/arguments/arguments.component'
import { SimulatorPropertyValueComponent } from './routes/device/simulator/property-value/property-value.component'

registerLocaleData(zh)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeviceComponent,
    SimulatorComponent,
    SimulatorArgumentsComponent,
    SimulatorPropertyValueComponent,
    AboutComponent
  ],
  imports: [BrowserModule, AppRoutingModule, NgZorroAntdModule, FormsModule, HttpClientModule, BrowserAnimationsModule],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, SimulatorService],
  bootstrap: [AppComponent]
})
export class AppModule {}
