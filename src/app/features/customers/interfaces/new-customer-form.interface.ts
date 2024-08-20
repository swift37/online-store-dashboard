import { FormControl, FormGroup } from '@angular/forms';
import { AddressesForm } from '../../../shared/interfaces/addresses-form.interface';

export interface NewCustomerForm {
  fullName: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string | null>;
  addAddress: FormControl<boolean>;
  address?: FormGroup<AddressesForm>;
}
