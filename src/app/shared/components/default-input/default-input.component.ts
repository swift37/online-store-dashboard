import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-input',
  templateUrl: './default-input.component.html',
  styleUrl: './default-input.component.scss',
})
export class DefaultInputComponent {
  @Input() type: string = 'text';
  @Input() id?: string;
  @Input() value?: any;
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() iconName?: string;
  @Input() disabled: boolean = false;
}
