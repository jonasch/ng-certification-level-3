import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastComponent } from './components/forecast/forecast.component';
import { OverviewComponent } from './components/overview/overview.component';

const routes: Routes = [
  { path: 'forecast/:zipcode', component: ForecastComponent },
  { path: '**', component: OverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
