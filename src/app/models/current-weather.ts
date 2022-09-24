import { Main } from './main';
import { Weather } from './weather';

export interface CurrentWeather {
  weather: Weather[];
  main: Main;
  name: string;
  zip?: string;
}
