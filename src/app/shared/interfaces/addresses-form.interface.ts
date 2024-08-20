import { FormControl, FormGroup } from '@angular/forms';
import { AddressForm } from './address-form.interface';

export interface AddressesForm {
  shippingAddress: FormGroup<AddressForm>;
  billingAddress?: FormGroup<AddressForm>;
  sameBillingAddress: FormControl<boolean>;
}
