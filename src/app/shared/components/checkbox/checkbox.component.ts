import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent extends ControlBaseComponent<boolean> {
  @Input()
  public id?: string;
  @Input()
  public label?: string;
  @Input()
  public labelPosition: 'left' | 'right' = 'right';
  @Input()
  public description?: string;
  @Input()
  public displayErrors: boolean = true;
  @Input()
  public override value: boolean = false;

  @Output() onChange = new EventEmitter<boolean>();

  @HostBinding('attr.checked')
  private _checked?: boolean;

  public valueChanged(event: Event): void {
    this.value = (<HTMLInputElement>event.target).checked;
    this._checked = this.value;
    this.changed(this.value);
    this.onChange.emit(this.value);
  }

  override writeValue(value: boolean): void {
    super.writeValue(value);
    this._checked = value;
  }

  //---------- Lifecycle methods start ----------

  override ngOnInit(): void {
    super.ngOnInit();
    this._checked = this.value;
  }

  //---------- Lifecycle methods end ----------
}
