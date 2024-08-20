import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-control-base',
  template: '',
})
export class ControlBaseComponent<T> implements ControlValueAccessor, OnInit {
  @Input()
  public disabled: boolean = false;

  public control?: FormControl;
  public value?: T;

  public changed: (value: T) => void = (value) => {};
  public touched: () => void = () => {};

  protected _touched: boolean = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (ngControl) {
      // Setting the value accessor directly (instead of using the providers)
      // to avoid running into a circular import.
      ngControl.valueAccessor = this;
    }
  }

  protected markAsTouched(): void {
    if (!this._touched) {
      this._touched = true;
      this.touched();
    }
  }

  //---------- ControlValueAccessor implementation start ----------

  public writeValue(value: T): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  public setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  //---------- ControlValueAccessor implementation end ----------

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    if (this.ngControl) {
      this.control = this.ngControl.control as FormControl;
    }
  }

  //---------- Lifecycle methods end ----------
}
