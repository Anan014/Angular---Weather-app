import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { RouterModule } from '@angular/router';
import { allAppRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    WeatherListComponent,
    WeatherCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(allAppRoutes) // The RouterModule will initialize and configure the Router 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
