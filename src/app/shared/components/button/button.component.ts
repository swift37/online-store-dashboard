import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input()
  public type: 'button' | 'submit' | 'reset' = 'button';
  @Input()
  public design: 'outlined' | 'filled' = 'outlined';
  @Input()
  public color: 'primary' | 'green' | 'danger' = 'primary';
  @Input()
  public size: 'half' | 'full' | 'half-slim' | 'full-slim' = 'full';
  @Input()
  public id?: string;
  @Input()
  public iconName?: string;
  @Input()
  public iconStyle: string = 'light';
  @Input()
  public iconPosition: 'left' | 'right' = 'left';
  @Input()
  public disabled: boolean | null = null;

  @Output() onClick = new EventEmitter<Event>();

  public onClickButton(event: Event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}
