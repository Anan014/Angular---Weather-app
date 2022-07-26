import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { list, Weather } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherApiUrl = 'https://community-open-weather-map.p.rapidapi.com/forecast'
  XRapidAPIKeyHeaderValue = 'ad5140e520msh0a784ed64c1738cp1a41f3jsn13b4dd1fd608'
  XRapidAPIHostHeaderValue = 'community-open-weather-map.p.rapidapi.com'

  open_Weather_API_Url = 'https://api.openweathermap.org/data/2.5/forecast?'

  constructor(private http: HttpClient) { }
  locationInput = 'Israel';
  listArrayIndex: number = 0;
  weatherList: list[] = [];
  allWeatherObject: Weather = {} as Weather;
  sortFocus: string = 'dt';
  lastInput = 'Israel';

  // getWeather(location: string) {
  //   return this.http.get<Weather>(this.weatherApiUrl, {
  //     headers: new HttpHeaders()
  //       .set('X-RapidAPI-Key', this.XRapidAPIKeyHeaderValue)
  //       .set('X-RapidAPI-Host', this.XRapidAPIHostHeaderValue),
  //     params: new HttpParams()
  //       .set('q', location)
  //       .set('units', 'metric')
  //       .set('mode', 'json')
  //   })
  // }

  getWeather(location: string) {
    return this.http.get<Weather>(this.open_Weather_API_Url, {
      params: new HttpParams()
        .set('q', location)
        .set('appid', 'ad74905d96e028b53c9809aea1ca4261')
        .set('units', 'metric')
    })
  }
}
