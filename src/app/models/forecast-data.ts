import { ForecastWeather } from './forecast-weather';

export interface ForecastData {
  forecastWeather?: ForecastWeather;
  zip: string;
  notification?: string;
}
