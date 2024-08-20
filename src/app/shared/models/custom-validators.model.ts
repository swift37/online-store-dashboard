import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  public static requiredIfNotDisabled: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const res = !!control.value && !control.disabled;
    return res ? null : { required: true };
  };

  public static forbiddenNames: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const regExp: RegExp = /(\w\s)+/;
    const res = !control.value || regExp.test(control.value);
    return res ? null : { forbiddenNames: true };
  };
}
