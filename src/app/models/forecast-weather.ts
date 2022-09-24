import { City } from './city';
import { ForecastUnit } from './forecast-unit';

export interface ForecastWeather {
  cnt: number;
  list: ForecastUnit[];
  city: City;
}
