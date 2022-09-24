import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../assets/environments/environment';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  countries: Country[] = [];

  constructor(private http: HttpClient) {
    this.getAllCountries().subscribe((data) => (this.countries = data));
  }

  getAllCountries() {
    return this.http.get<Country[]>(
      `${environment.restcountries.BASE_URL}/all`
    );
  }

  searchCountries(searchValue: string): Country[] {
    return this.countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
      )
      .sort((a, b) =>
        a.name.common < b.name.common
          ? -1
          : a.name.common === b.name.common
          ? 0
          : 1
      );
  }
}
