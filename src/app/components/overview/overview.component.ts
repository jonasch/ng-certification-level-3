import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatestAll,
  from,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherData } from '../../models/weather-data';
import { OpenWeatherMapService } from '../../services/open-weather-map.service';
import { ZipcodeManagerService } from '../../services/zipcode-manager.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  currentData: WeatherData[] = [];
  constructor(
    private zipcodeService: ZipcodeManagerService,
    private weatherService: OpenWeatherMapService
  ) {}

  ngOnInit() {
    timer(0, 30_000)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((time) => this.zipcodeService.getZipcodes()),
        tap((zips) => console.log(new Date(), 'Update weather data'))
      )
      .subscribe((zips) => {
        if (zips.length === 0) {
          this.currentData = [];
        } else {
          from(zips)
            .pipe(
              map((zip) => this.weatherService.getCurrentWeather(zip)),
              combineLatestAll()
            )
            .subscribe((data) => (this.currentData = data));
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onRemove(zip: string): void {
    this.zipcodeService.removeZipcode(zip);
  }
}
