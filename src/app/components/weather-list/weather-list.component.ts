import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';
import { list, Weather } from 'src/app/interfaces/weather.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['../../app.component.css', './weather-list.component.css']
})

//TODO 1: ngOnInit back from card list to save sort by,
//TODO 2: CSS  
//TODO 3: 
//TODO 4:  

export class WeatherListComponent implements OnInit {

  locationInput: string = '';
  weatherObj: Weather = {} as Weather

  constructor(private WeatherService: WeatherService, private router: Router) {
    this.locationInput = WeatherService.locationInput
  }
  ngOnInit(): void {
    this.getWeatherObject(this.locationInput)
  }

  getWeatherObject(data: string) {
    console.log('data', data);
    this.WeatherService.getWeather(data).pipe(
      // tap(res => console.log('List-getWeatherObject-pipe', res.city))
    )
      .subscribe(res => {
        this.weatherObj = res
        this.WeatherService.allWeatherObject = res;
        this.WeatherService.locationInput = data;
      },
        err => console.log('HTTP Error', err)
      )
  }

  sortButton(sortBy: string) {
    console.log(this.WeatherService.allWeatherObject.list[0].dt)
    this.WeatherService.allWeatherObject.list =
      this.WeatherService.allWeatherObject.list.sort((a, b) => {
        return sortBy === "temp" ? a.main.temp - b.main.temp :
          sortBy === "feels_like" ? a.main.feels_like - b.main.feels_like : a.dt - b.dt
      });
    this.weatherObj.list = this.WeatherService.allWeatherObject.list;
    console.log(this.WeatherService.allWeatherObject.list[0].dt)
  }

  navigate(weatherListIndex: number) {
    this.WeatherService.listArrayIndex = weatherListIndex;
    console.log('List-navigate-weatherListIndex', weatherListIndex);
    this.router.navigateByUrl('/weather-card')
  }
}
