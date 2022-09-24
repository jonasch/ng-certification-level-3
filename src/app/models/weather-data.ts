import { CurrentWeather } from './current-weather';

export interface WeatherData {
  currentWeather?: CurrentWeather;
  zip: string;
  notification?: string;
}
