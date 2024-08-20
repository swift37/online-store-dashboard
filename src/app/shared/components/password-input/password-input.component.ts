import { Component, Input } from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: [
    '../../styles/custom-control.scss',
    './password-input.component.scss',
  ],
})
export class PasswordInputComponent
  extends ControlBaseComponent<string>
  implements Validator
{
  @Input()
  public id?: string;
  @Input()
  public placeholder?: string;

  @Input()
  public label?: string;
  @Input()
  public innerLabel: boolean = false;

  @Input()
  public filledStyle: boolean = false;
  @Input()
  public hideCheck: boolean = false;

  @Input()
  public validateStrength: boolean = false;

  public type: string = 'password';

  public iconName?: string;

  public onChange(event: Event): void {
    this.value = (<HTMLInputElement>event.target).value;
    this.changed(this.value);
  }

  public togglePasswordVisible(): void {
    this.type = this.type == 'text' ? 'password' : 'text';
    this.iconName = this.type == 'text' ? 'fi_eye' : 'fi_eye-off';
  }

  validate({ value }: AbstractControl): ValidationErrors | null {
    const hasRequiredLength: boolean = value?.length >= 8;
    const hasUpperCase: boolean = /[A-Z]+/.test(value);
    const hasNumeric: boolean = /[0-9]+/.test(value);
    const hasSpecialChar: boolean = /[!-\/:-@[-`{-~]/.test(value);

    const passwordValid = hasUpperCase && hasNumeric && hasSpecialChar;

    return !passwordValid
      ? {
          passwordStrength: {
            hasRequiredLength,
            hasUpperCase,
            hasNumeric,
            hasSpecialChar,
          },
        }
      : null;
  }

  //---------- Lifecycle methods start ----------

  override ngOnInit(): void {
    super.ngOnInit();
    this.value = '';
    this.iconName = this.type == 'text' ? 'fi_eye' : 'fi_eye-off';

    if (this.control && this.validateStrength)
      this.control.setValidators(this.validate);
  }

  //---------- Lifecycle methods end ----------
}
