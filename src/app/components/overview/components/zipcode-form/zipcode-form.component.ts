import { Component, OnInit } from '@angular/core';
import { Country } from '../../../../models/country';
import { CountriesService } from '../../../../services/countries.service';
import { ZipcodeManagerService } from '../../../../services/zipcode-manager.service';

@Component({
  selector: 'app-zipcode-form',
  templateUrl: './zipcode-form.component.html',
  styleUrls: ['./zipcode-form.component.css'],
})
export class ZipcodeFormComponent {
  formModel = {
    zipcode: '',
    country: undefined,
  };

  countrySearchValue = '';
  countries: Country[] = [];
  constructor(
    private zipcodeService: ZipcodeManagerService,
    private countriesService: CountriesService
  ) {}

  onAddLocation() {
    this.zipcodeService.addZipcode(this.formModel.zipcode);
    this.formModel.zipcode = '';
  }

  searchCountry(searchValue: string) {
    this.countries = this.countriesService.searchCountries(searchValue);
  }
}
