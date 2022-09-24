import { Pipe, PipeTransform } from '@angular/core';

type Condition = 'rain' | 'snow' | 'sun' | 'clouds';

@Pipe({
  name: 'weather',
})
export class WeatherPipe implements PipeTransform {
  transform(statusId: number): Condition {
    if (statusId < 600) {
      return 'rain';
    } else if (statusId >= 600 && statusId < 700) {
      return 'snow';
    } else if (statusId === 800) {
      return 'sun';
    } else {
      return 'clouds';
    }
  }
}
