import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NumbersRange } from '../../shared/interfaces/numbers-range.interface';
import { AddressForm } from '../../shared/interfaces/address-form.interface';
import { CustomValidators } from '../../shared/models/custom-validators.model';
import { AddressesForm } from '../../shared/interfaces/addresses-form.interface';

@Injectable({ providedIn: 'root' })
export class FormsService {
  public patchFormByValue(patchedForm: FormGroup, formValue: any): void {
    if (!formValue) return;
    for (const [key, value] of Object.entries(formValue)) {
      patchedForm.get(key)?.patchValue(value);
    }
  }

  public addControlToForm(
    form: FormGroup,
    formControlName: string,
    value?: any,
    validators: any[] = []
  ): void {
    form.addControl(formControlName, new FormControl(value, validators));
  }

  public addRangeControlToForm(
    form: FormGroup,
    formControlName: string,
    value?: NumbersRange,
    validators: any[] = []
  ): void {
    form.addControl(
      formControlName,
      new FormGroup({
        from: new FormControl(value?.from || 0, validators),
        to: new FormControl(value?.to || 0, validators),
      })
    );
  }

  public createAddressForm(): FormGroup<AddressForm> {
    return new FormGroup<AddressForm>({
      country: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      state: new FormControl(
        { value: null, disabled: true },
        CustomValidators.requiredIfNotDisabled
      ),
      city: new FormControl(
        { value: null, disabled: true },
        CustomValidators.requiredIfNotDisabled
      ),
      code: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      details: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      apartment: new FormControl(null),
    });
  }

  public createAddressesForm(): FormGroup<AddressesForm> {
    return new FormGroup<AddressesForm>({
      shippingAddress: this.createAddressForm(),
      sameBillingAddress: new FormControl<boolean>(true, {
        nonNullable: true,
      }),
    });
  }
}
