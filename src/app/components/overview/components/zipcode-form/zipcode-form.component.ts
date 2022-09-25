import {Component, OnDestroy, OnInit} from '@angular/core';
import {Country} from '../../../../models/country';
import {CountriesService} from '../../../../services/countries.service';
import {ZipcodeManagerService} from '../../../../services/zipcode-manager.service';
import {Subject, takeUntil} from 'rxjs';
import {SelectOption} from '../../../shared/autocomplete-select/models/select-option';

@Component({
    selector: 'app-zipcode-form',
    templateUrl: './zipcode-form.component.html',
    styleUrls: ['./zipcode-form.component.css'],
})
export class ZipcodeFormComponent implements OnInit, OnDestroy {

    destroy$ = new Subject<void>();
    countryOptions: SelectOption<Country>[] = [];

    formModel = {
        zipcode: '',
        country: undefined,
    };

    constructor(
        private zipcodeService: ZipcodeManagerService,
        private countriesService: CountriesService
    ) {
    }


    ngOnInit(): void {
        this.countriesService.getCountries()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                countries => this.countryOptions = countries.map(country => ({key: country.name.common, value: country}))
            );
        this.resetFormModel();
    }


    ngOnDestroy(): void {
        this.destroy$.next();
    }

    private resetFormModel() {
        this.formModel = {
            zipcode: '',
            country: undefined,
        };
    }

    onAddLocation() {
        const zipcode = `${this.formModel.zipcode},${this.formModel.country.cca2}`;
        this.zipcodeService.addZipcode(zipcode);
    }


    onSelect(value: Country) {
        this.formModel.country = value;
    }
}
