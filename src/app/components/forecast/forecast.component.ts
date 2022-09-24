import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ForecastData } from '../../models/forecast-data';
import { OpenWeatherMapService } from '../../services/open-weather-map.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  forecastData$: Observable<ForecastData>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: OpenWeatherMapService
  ) {}

  ngOnInit() {
    this.forecastData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const selectedZip = params.get('zipcode');
        return this.weatherService.getWeatherForecast(selectedZip, 5);
      })
    );
  }

  goHome() {
    this.router.navigateByUrl('');
  }
}
