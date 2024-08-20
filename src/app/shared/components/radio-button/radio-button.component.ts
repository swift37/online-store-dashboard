import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
})
export class RadioButtonComponent extends ControlBaseComponent<any> {
  @Input()
  public id?: string;
  @Input()
  public name?: string;
  @Input()
  public label?: string;
  @Input()
  public labelPosition: 'left' | 'right' = 'right';
  @Input()
  public description?: string;
  @Input()
  public displayErrors: boolean = true;
  @Input()
  public checked: boolean = false;
  @Input()
  public override value: any;

  @Output() onChange = new EventEmitter<any>();

  public valueChanged(event: Event): void {
    this.changed(this.value);
    this.onChange.emit(this.value);
    this.checked = (<HTMLInputElement>event.target).checked;
  }

  override writeValue(value: boolean): void {
    if (this.value == value) {
      this.checked = true;
    }
  }
}
