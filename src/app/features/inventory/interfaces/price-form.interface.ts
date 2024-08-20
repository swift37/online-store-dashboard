import { FormControl } from '@angular/forms';
import { DiscountType } from '../enums/discount-type.enum';

export interface PriceForm {
  sellingPrice: FormControl<number | null>;
  costPrice: FormControl<number | null>;
  addDiscount: FormControl<boolean>;
  discountType?: FormControl<DiscountType>;
  rawDiscount?: FormControl<number | null>;
  discount: FormControl<number>;
}
