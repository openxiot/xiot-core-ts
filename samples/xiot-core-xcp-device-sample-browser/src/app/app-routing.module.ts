import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './routes/home/home.component'
import { DeviceComponent } from './routes/device/device.component'
import { AboutComponent } from './routes/about/about.component'
import { SimulatorComponent } from './routes/device/simulator/simulator.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'device/simulator/:serialNumber/:productId/:productVersion', component: SimulatorComponent },
  { path: 'about', component: AboutComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
