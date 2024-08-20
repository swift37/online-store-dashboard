import { FormControl } from '@angular/forms';

export interface AddressForm {
  country: FormControl<string>;
  state: FormControl<string | null>;
  city: FormControl<string | null>;
  code: FormControl<string>;
  details: FormControl<string>;
  apartment: FormControl<string | null>;
}
