import { Component, Input } from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['../../styles/custom-control.scss', './input.component.scss'],
})
export class InputComponent extends ControlBaseComponent<any> {
  @Input()
  public type: string = 'text';
  @Input()
  public id?: string;
  @Input()
  public placeholder?: string;

  @Input()
  public label?: string;
  @Input()
  public innerLabel: boolean = false;

  @Input()
  public iconName?: string;
  @Input()
  public iconPosition: 'left' | 'right' = 'left';
  @Input()
  public iconStyle: string = 'light';

  @Input()
  public filledStyle: boolean = false;
  @Input()
  public slim: boolean = false;
  @Input()
  public emphasizedText: boolean = false;
  @Input()
  public hideCheck: boolean = false;
  @Input()
  public hideSpin: boolean = false;

  public onChange(event: Event): void {
    this.value = (<HTMLInputElement>event.target).value;
    this.changed(this.value);
  }

  public onIncrease(): void {
    if (!this.disabled && this.type == 'number') {
      this.markAsTouched();
      this.changed(++this.value);
    }
  }

  public onDecrease(): void {
    if (!this.disabled && this.type == 'number') {
      this.markAsTouched();
      this.changed(--this.value);
    }
  }

  //---------- Lifecycle methods start ----------

  override ngOnInit(): void {
    super.ngOnInit();

    if (!this.value) {
      switch (this.type) {
        case 'date':
          this.value = new Date().toISOString().slice(0, 10);
          this.iconName = 'calendar';
          break;
        case 'time':
          this.value = new Date().toTimeString().slice(0, 8);
          this.iconName = 'fi_clock';
          this.iconStyle = 'feather';
          break;
        default:
          this.value = null;
          break;
      }
    }
  }

  //---------- Lifecycle methods end ----------
}
