import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, first, Observable, timer} from 'rxjs';
import {CssClassConfig} from './models/css-class-config';

type State = 'initial' | 'waiting' | 'done' | 'error';

@Component({
    selector: 'app-status-button',
    templateUrl: './status-button.component.html',
    styleUrls: ['./status-button.component.css']
})
export class StatusButtonComponent implements OnInit {
    @Input() observable: Observable<any>;
    @Input() disabled: boolean;
    @Input() type: string;

    @Input() cssClassConfig: CssClassConfig;

    _state$ = new BehaviorSubject<State>('initial');
    classConfig;

    constructor() {
    }

    ngOnInit(): void {
        this._state$.subscribe(data => {
            // set custom css classes if there are some
            if (!!this.cssClassConfig) {
                if (!!this.cssClassConfig[data]) {
                    this.classConfig = this.cssClassConfig[data].join(' ');
                } else {
                    this.classConfig = undefined;
                }
            }

        });
    }

    onClick() {
        this._state$.next('waiting');
        this.observable.subscribe({
            next: () => this._state$.next('waiting'),
            error: () => this._state$.next('error'),
            complete: () => {
                this._state$.next('done');
                // reset state after 500ms
                timer(500).pipe(first()).subscribe(() => this._state$.next('initial'));
            }
        });
    }

}
