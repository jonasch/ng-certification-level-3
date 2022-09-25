import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectOption} from './models/select-option';
import {AbstractControl, FormControl, NgForm, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';


interface InternalOption<T> extends SelectOption<T> {
    html: string;
}

@Component({
    selector: 'app-autocomplete-select',
    templateUrl: './autocomplete-select.component.html',
    styleUrls: ['./autocomplete-select.component.css']
})
export class AutocompleteSelectComponent<T> implements OnInit {

    @Input() set options(optionsInput: SelectOption<T>[]) {
        this._options = [...optionsInput];
        this.setSearchValue('');
    };

    @Input() name: string;
    @Output() optionSelect = new EventEmitter<T>();

    searchValue = '';
    _control: AbstractControl;
    _options: SelectOption<T>[] = [];
    _filteredOptions: InternalOption<T>[] = [];
    _isPanelOpen = new BehaviorSubject<boolean>(false);

    constructor(private formGroup: NgForm, private ref: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.formGroup?.form?.addControl(this.name, new FormControl(null, Validators.required));
        this._control = this.formGroup.form.controls[this.name];
        this._control.valueChanges.pipe().subscribe(value => {
            if (!value) {
                this.setSearchValue('');
            }
        });
    }

    private setSearchValue(searchValue: string) {
        this.searchValue = searchValue;
        this.filterOptions(this.searchValue);
    }

    filterOptions(searchValue: string) {
        this._filteredOptions = this._options
            .filter(option => option.key.toLowerCase().includes(searchValue.toLowerCase()))
            .sort((a, b) =>
                a.key < b.key ? -1 : a.key === b.key ? 0 : 1
            )
            .map(option => ({...option, html: this.getHtml(option, searchValue)}));
    }

    selectOption(input: SelectOption<T>) {
        this._isPanelOpen.next(false);
        this.searchValue = '';
        this.ref.detectChanges();
        if (!!input) {
            this.setSearchValue(input.key);
            this._control.setValue(input.value);
            this.optionSelect.emit(input.value);
        }
    }


    onFocusIn() {
        this._isPanelOpen.next(true);
    }

    private getHtml(option: SelectOption<T>, searchValue: string) {
        var regEx = new RegExp(searchValue, 'i');
        var replaceHtml = `<strong>${regEx.exec(option.key)}</strong>`;
        return option.key.replace(regEx, replaceHtml);
    }
}
