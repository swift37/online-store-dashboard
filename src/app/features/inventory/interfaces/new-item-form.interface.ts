import { FormArray, FormControl } from '@angular/forms';

export interface NewItemForm {
  name: FormControl<string>;
  categoryId: FormControl<number | null>;
  unitsInStock: FormControl<number | null>;
  manufacturer: FormControl<string>;
  manufacturersCode: FormControl<string>;
  storeCode: FormControl<string>;
  description: FormControl<string>; //---
  specificationIds: FormArray<FormControl<number | null>>; //---
  state: FormControl<number | null>;
  isNonReturnable: FormControl<boolean>;
  addPublishingDate: FormControl<boolean>;
  publishingDate: FormControl<string | null>;
  publishingTime: FormControl<string | null>;
  addLabels: FormControl<boolean>;
  labels: FormControl<number[]>;
}
