import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Country} from '../../../../models/country';
import {CountriesService} from '../../../../services/countries.service';
import {ZipcodeManagerService} from '../../../../services/zipcode-manager.service';
import {Observable, Subject, takeUntil} from 'rxjs';
import {SelectOption} from '../../../shared/autocomplete-select/models/select-option';
import {NgForm} from '@angular/forms';
import {CssClassConfig} from '../../../shared/status-button/models/css-class-config';

@Component({
    selector: 'app-zipcode-form',
    templateUrl: './zipcode-form.component.html',
    styleUrls: ['./zipcode-form.component.css'],
})
export class ZipcodeFormComponent implements OnInit, OnDestroy {

    @ViewChild(NgForm) ngForm: NgForm;
    destroy$ = new Subject<void>();
    countryOptions: SelectOption<Country>[] = [];
    formModel;

    observable = new Observable((subscriber => {
        const correctScope = this;
        // perform with timeout, so we can see different button states
        setTimeout(() => {
            correctScope.onAddLocation();
            correctScope.ngForm.resetForm();
            subscriber.complete();
        }, 1000);
    }));

    // for customizing the status buttons classes
    cssClassConfig: CssClassConfig = {
        initial: ['btn', 'btn-primary'],
        waiting: ['btn', 'btn-primary', 'disabled'],
        done: ['btn', 'btn-success']
    };

    constructor(
        private zipcodeService: ZipcodeManagerService,
        private countriesService: CountriesService
    ) {
    }

    ngOnInit(): void {
        // convert countries data for autocomplete
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
