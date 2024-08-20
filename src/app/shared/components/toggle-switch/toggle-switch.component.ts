import { Component, Input } from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss',
})
export class ToggleSwitchComponent extends ControlBaseComponent<boolean> {
  @Input()
  public id?: string;
  @Input()
  public label?: string;
  @Input()
  public labelPosition: 'left' | 'right' = 'right';
  @Input()
  public size: 'small' | 'medium' = 'small';
  @Input()
  public description?: string;
  @Input()
  public displayErrors: boolean = true;

  @Input()
  public withIcon: boolean = false;

  public onChange(event: Event): void {
    this.value = (<HTMLInputElement>event.target).checked;
    this.changed(this.value);
  }
}
