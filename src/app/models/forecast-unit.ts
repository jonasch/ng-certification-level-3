import { Temp } from './temp';
import { Weather } from './weather';

export interface ForecastUnit {
  dt: number;
  temp: Temp;
  weather: Weather[];
}
