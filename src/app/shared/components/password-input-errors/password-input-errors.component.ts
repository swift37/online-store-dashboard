import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-input-errors',
  templateUrl: './password-input-errors.component.html',
  styleUrls: [
    '../../styles/custom-control.scss',
    './password-input-errors.component.scss',
  ],
})
export class PasswordInputErrorsComponent {
  @Input({ required: true })
  public control!: FormControl;
}
