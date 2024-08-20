import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AddressesForm } from '../../../shared/interfaces/addresses-form.interface';
import { OrderLineData } from '../../../shared/components/order-line-control/order-line-control.component';

export interface NewOrderForm {
  userId: FormControl<string | null>;
  fullName: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string>;
  paymentMethod: FormControl<string>;
  date: FormControl<string>;
  time: FormControl<string>;
  status: FormControl<string>;
  notes: FormControl<string | null>;
  address: FormGroup<AddressesForm>;
  //items: FormArray<FormControl<{ productId: number; quantity: number }>>;
  items: FormArray<FormControl<OrderLineData>>;
  newUser: FormControl<boolean>;
  useUsersData: FormControl<boolean>;
}
