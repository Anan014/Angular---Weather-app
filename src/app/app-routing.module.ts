import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherListComponent } from './components/weather-list/weather-list.component';

const routes: Routes = [{ path: '', component: WeatherListComponent },
{ path: 'weather-card', component: WeatherCardComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
