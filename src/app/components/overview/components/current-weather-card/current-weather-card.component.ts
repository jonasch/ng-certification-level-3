import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherData } from '../../../../models/weather-data';

@Component({
  selector: 'app-current-weather-card',
  templateUrl: './current-weather-card.component.html',
  styleUrls: ['./current-weather-card.component.css'],
})
export class CurrentWeatherCardComponent {
  @Input() data: WeatherData;
  @Output() close: EventEmitter<string> = new EventEmitter();

  onRemoveClicked() {
    this.close.emit(this.data.zip);
  }
}
