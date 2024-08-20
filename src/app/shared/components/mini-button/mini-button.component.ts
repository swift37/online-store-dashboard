import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mini-button',
  templateUrl: './mini-button.component.html',
  styleUrl: './mini-button.component.scss',
})
export class MiniButtonComponent {
  @Input()
  public id?: string;
  @Input()
  public iconName?: string;
  @Input()
  public iconPosition: 'left' | 'right' = 'left';
  @Input()
  public disabled: boolean | null = null;
  @Input()
  public iconStyle: string = 'light';

  @Output() onClick = new EventEmitter<Event>();

  public onClickButton(event: Event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}
