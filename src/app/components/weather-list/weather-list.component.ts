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

//TODO 1: CSS  
//TODO 2: location undefined
//TODO 3:  

export class WeatherListComponent implements OnInit {

  locationInput: string = this.WeatherService.locationInput;
  weatherObj: Weather = this.WeatherService.allWeatherObject;

  constructor(private WeatherService: WeatherService, private router: Router) {
    // this.locationInput = WeatherService.locationInput
  }

  ngOnInit(): void {
    if (!this.weatherObj.city) { // checks if the weatherObj doesn't have data to prevent calling the API (after sorting)
      this.getWeatherObject(this.WeatherService.locationInput);
    }
  }

  getWeatherObject(data: string) {
    console.log('data', data);
    this.WeatherService.getWeather(data).pipe(
      // tap(res => console.log('List-getWeatherObject-pipe', res.city))
    )
      .subscribe(res => {
        console.log(res);
        
        this.weatherObj = res
        this.WeatherService.allWeatherObject = res;
        this.WeatherService.locationInput = data;
      },
        err => console.log('HTTP Error', err)
      )
  }

  sortButton(sortBy: string) {  
    this.WeatherService.allWeatherObject.list =
      this.WeatherService.allWeatherObject.list.sort((a, b) => {
        return sortBy === "temp" ? a.main.temp - b.main.temp :
          sortBy === "feels_like" ? a.main.feels_like - b.main.feels_like : a.dt - b.dt
      });
    this.weatherObj.list = this.WeatherService.allWeatherObject.list;
  }

  navigate(weatherListIndex: number) {
    this.WeatherService.listArrayIndex = weatherListIndex;
    console.log('List-navigate-weatherListIndex', weatherListIndex);
    this.router.navigateByUrl('/weather-card')
  }

  upperCaseWeatherDescription(weatherDescription:string){
    return weatherDescription.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
  }

}
