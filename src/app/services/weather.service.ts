import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { list, Weather } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  locationInput = 'israel';
  listArrayIndex: number = 0;
  weatherList: list[] = [];
  allWeatherObject: Weather = {} as Weather;
  sortFocus:string ='dt';

  getWeather(location: string) {
    return this.http.get<Weather>(environment.weatherApiUrl, {
      headers: new HttpHeaders()
        .set('X-RapidAPI-Key', environment.XRapidAPIKeyHeaderValue)
        .set('X-RapidAPI-Host', environment.XRapidAPIHostHeaderValue),
      params: new HttpParams()
        .set('q', location)
        .set('units', 'metric')
        .set('mode', 'json')
    })
  }
}
