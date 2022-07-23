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

export class WeatherListComponent implements OnInit {

  locationInput: string = this.WeatherService.locationInput;
  lastInput: string = this.WeatherService.lastInput;
  weatherObj: Weather = this.WeatherService.allWeatherObject;
  invaledInput: boolean = false;

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
        this.WeatherService.locationInput = res.city.name;
        this.locationInput = res.city.name;
        this.invaledInput = false;

        this.WeatherService.lastInput = res.city.name;
        this.lastInput = res.city.name;
        console.log('this.WeatherService.lastInput', this.WeatherService.lastInput);
        console.log('this.WeatherService.locationInput', this.WeatherService.locationInput);

      },
        err => {
          console.log('HTTP Error', err)
          this.invaledInput = true;
          this.WeatherService.lastInput = this.locationInput;
          this.WeatherService.locationInput = this.locationInput;
          this.lastInput = this.locationInput;

          console.log('this.WeatherService.lastInput', this.WeatherService.lastInput);
          console.log('this.WeatherService.locationInput', this.WeatherService.locationInput);

          console.log('this.lastInput', this.lastInput);
          console.log('this.locationInput', this.locationInput);
        }
      )
  }

  sortButton(sortBy: string) {
    this.WeatherService.allWeatherObject.list =
      this.WeatherService.allWeatherObject.list.sort((a, b) => {
        return sortBy === "temp" ? a.main.temp - b.main.temp :
          sortBy === "feels_like" ? a.main.feels_like - b.main.feels_like :
        sortBy === "humidity" ? b.main.humidity - a.main.humidity : a.dt - b.dt;
      });
    this.weatherObj.list = this.WeatherService.allWeatherObject.list;
  }

  navigate(weatherListIndex: number) {
    this.WeatherService.listArrayIndex = weatherListIndex;
    console.log('List-navigate-weatherListIndex', weatherListIndex);
    this.router.navigateByUrl('/weather-card')
  }

  upperCaseWeatherDescription(weatherDescription: string) {
    return weatherDescription.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
  }

}
