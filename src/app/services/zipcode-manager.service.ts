import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZipcodeManagerService {
  private readonly KEY_ZIPCODES = 'zipcodes';

  private _zipcodes: BehaviorSubject<string[]>;
  private zipcodes: Observable<string[]>;

  constructor() {
    let zipcodes: string[] = [];
    if (localStorage.getItem(this.KEY_ZIPCODES)) {
      zipcodes = JSON.parse(localStorage.getItem(this.KEY_ZIPCODES));
    } else {
      localStorage.setItem(this.KEY_ZIPCODES, JSON.stringify(zipcodes));
    }
    this._zipcodes = new BehaviorSubject<string[]>(zipcodes);
    this.zipcodes = this._zipcodes.asObservable();
  }

  getZipcodes(): Observable<string[]> {
    return this.zipcodes;
  }

  addZipcode(zipcode): void {
    let zipcodes = JSON.parse(localStorage.getItem(this.KEY_ZIPCODES));
    if (!zipcodes.includes(zipcode)) {
      zipcodes.push(zipcode);
    }
    localStorage.setItem(this.KEY_ZIPCODES, JSON.stringify(zipcodes));
    this._zipcodes.next(zipcodes);
  }

  removeZipcode(zipcode): void {
    let zipcodes = JSON.parse(localStorage.getItem(this.KEY_ZIPCODES));
    zipcodes = zipcodes.filter((code) => code !== zipcode);
    localStorage.setItem(this.KEY_ZIPCODES, JSON.stringify(zipcodes));
    this._zipcodes.next(zipcodes);
  }
}
