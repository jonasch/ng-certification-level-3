import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../assets/environments/environment';
import { CurrentWeather } from '../models/current-weather';
import { ForecastData } from '../models/forecast-data';
import { ForecastWeather } from '../models/forecast-weather';
import { WeatherData } from '../models/weather-data';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherMapService {
  constructor(private http: HttpClient) {}

  private getHttpParams(zip: string): HttpParams {
    return new HttpParams()
      .set('zip', zip)
      .set('appid', environment.openWeatherService.APP_KEY)
      .set('units', environment.openWeatherService.UNIT);
  }

  getCurrentWeather(zip: string): Observable<WeatherData> {
    return this.http
      .get<CurrentWeather>(
        `${environment.openWeatherService.BASE_URL}/weather`,
        {
          params: this.getHttpParams(zip),
        }
      )
      .pipe(
        map((data) => {
          return { currentWeather: data, zip };
        }),
        catchError((error) => {
          let notification;
          if (error.status === 404) {
            notification = 'Zipcode not found';
          }
          return of({ zip, notification });
        })
      );
  }

  getWeatherForecast(zip: string, count: number): Observable<ForecastData> {
    return this.http
      .get<ForecastWeather>(
        `${environment.openWeatherService.BASE_URL}/forecast/daily`,
        {
          params: this.getHttpParams(zip).set('cnt', count.toString()),
        }
      )
      .pipe(
        map((data) => {
          return { forecastWeather: data, zip };
        }),
        catchError((error) => {
          let notification;
          if (error.status === 404) {
            notification = 'Zipcode not found';
          }
          return of({ zip, notification });
        })
      );
  }
}
