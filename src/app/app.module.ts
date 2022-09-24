import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ZipcodeFormComponent } from './components/overview/components/zipcode-form/zipcode-form.component';
import { CurrentWeatherCardComponent } from './components/overview/components/current-weather-card/current-weather-card.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ForecastItemComponent } from './components/forecast/components/forecast-item/forecast-item.component';
import { WeatherPipe } from './pipes/weather.pipe';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    ZipcodeFormComponent,
    CurrentWeatherCardComponent,
    ForecastComponent,
    OverviewComponent,
    ForecastItemComponent,
    WeatherPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
