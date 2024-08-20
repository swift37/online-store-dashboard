import { Component, HostBinding, Input } from '@angular/core';
import { StatusDesign } from '../../enums/status-label-design.enum';

@Component({
  selector: 'app-status-label',
  templateUrl: './status-label.component.html',
  styleUrl: './status-label.component.scss',
})
export class StatusLabelComponent {
  @HostBinding('class')
  @Input()
  public design: StatusDesign = StatusDesign.primary;

  @HostBinding('class.slim')
  @Input()
  public slim: boolean = false;
}
