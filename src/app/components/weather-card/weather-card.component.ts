import { Component, OnInit } from '@angular/core';
import { list, Weather } from 'src/app/interfaces/weather.interface';
import { WeatherService } from 'src/app/services/weather.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})

export class WeatherCardComponent implements OnInit {
  constructor(private WeatherService: WeatherService) { }

  listArrayIndex: number = this.WeatherService.listArrayIndex;
  weatherObj: Weather = this.WeatherService.allWeatherObject;
  backwardButton = false;
  forwardButton = false;

  ngOnInit(): void {
    if (!this.weatherObj?.city?.id) {
      this.getWeatherObject(this.WeatherService.locationInput);
      console.log(this.weatherObj.city.id)
      console.log(!this.weatherObj.city.id)
    }
    this.listArrayIndex = this.WeatherService.listArrayIndex;
    console.log("card-ngOnInit-listArrayIndex", this.listArrayIndex);
    console.log("card-ngOnInit-allWeatherObject", this.WeatherService.allWeatherObject);
    console.log("card-ngOnInit-weatherObj", this.weatherObj);
  }

  getWeatherObject(data: string) {
    this.WeatherService.getWeather(data).pipe(tap(
      //res => console.log('card-getWeatherObject-pipe', res)
    ))
      .subscribe(res => {
        this.weatherObj = res;
        // console.log('card-getWeatherObject-weatherObj', this.weatherObj);
      },
        err => console.log('HTTP Error', err)
      )
  }

  indexChanger(indexStatus: number) {
    this.listArrayIndex = this.listArrayIndex + indexStatus;
    this.WeatherService.listArrayIndex = this.listArrayIndex;
  }

}
