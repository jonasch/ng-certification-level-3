import { Component, Input, OnInit } from '@angular/core';
import { ForecastUnit } from '../../../../models/forecast-unit';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.css'],
})
export class ForecastItemComponent {
  @Input() item: ForecastUnit;
}
