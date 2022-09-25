import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../assets/environments/environment';
import {Country} from '../models/country';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    _countries = new BehaviorSubject<Country[]>([]);

    constructor(private http: HttpClient) {
        this.fetchAllCountries().subscribe((data) => (this._countries.next(data)));
    }

    private fetchAllCountries() {
        return this.http.get<Country[]>(
            `${environment.restcountries.BASE_URL}/all`
        );
    }

    getCountries(): Observable<Country[]> {
        return this._countries.asObservable();
    }

}
