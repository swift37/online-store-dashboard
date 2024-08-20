import { Component, Input } from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['../../styles/custom-control.scss', './text-area.component.scss'],
})
export class TextAreaComponent extends ControlBaseComponent<string> {
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
  public hideCheck: boolean = false;

  public onChange(event: Event): void {
    this.value = (<HTMLTextAreaElement>event.target).value;
    this.changed(this.value);
  }
}
