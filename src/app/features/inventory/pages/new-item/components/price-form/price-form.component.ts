import { Component } from '@angular/core';
import { PriceForm } from '../../../../interfaces/price-form.interface';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import {
  animate,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DiscountType } from '../../../../enums/discount-type.enum';
import { SharedModule } from '../../../../../../shared/shared.module';
import { FormsService } from '../../../../../../core/services/forms-service.service';
import { SelectSettings } from '../../../../../../shared/interfaces/select-settings.interface';

export interface DiscountSelectOption {
  type: DiscountType;
  label: string;
}

@Component({
  selector: 'app-price-form',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './price-form.component.html',
  styleUrl: './price-form.component.scss',
  animations: [
    trigger('field', [
      transition('void => *', [
        style({
          height: 0,
          overflow: 'hidden',
        }),
        group([
          animate(150, style({ height: '*' })),
          animate(300, style({ overflow: 'visible' })),
        ]),
      ]),
      transition('* => void', [
        style({
          overflow: 'hidden',
        }),
        animate(
          150,
          style({
            height: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class PriceFormComponent {
  public priceForm!: FormGroup<PriceForm>;
  private addDiscountSub?: Subscription;
  private priceSub?: Subscription;
  private discountTypeSub?: Subscription;
  private rawDiscountSub?: Subscription;

  constructor(
    private controlContainer: ControlContainer,
    private formsService: FormsService
  ) {}

  public selectOptions: DiscountSelectOption[] = [
    { type: DiscountType.amount, label: 'Amount' },
    { type: DiscountType.inPercent, label: 'Amount in Percent' },
    { type: DiscountType.finalPrice, label: 'Price after Discount' },
  ];

  public selectSettings: SelectSettings = {
    idPropKey: 'type',
    displayPropKey: 'label',
  };

  private calculateDiscount(): void {
    const discountType = this.priceForm.controls.discountType?.value;
    const price = this.priceForm.controls.sellingPrice.value;
    const rawDiscount = this.priceForm.controls.rawDiscount?.value;
    const discount = this.priceForm.controls.discount;

    if (!discountType || !price || !rawDiscount || !discount) return;

    switch (discountType) {
      case DiscountType.amount:
        if (rawDiscount >= price) return;
        discount.patchValue(price - rawDiscount);
        return;
      case DiscountType.inPercent:
        if (rawDiscount >= 100.0) return;
        discount.patchValue(price * (rawDiscount / 100));
        return;
      case DiscountType.finalPrice:
        if (rawDiscount <= 0) return;
        discount.patchValue(rawDiscount);
        return;
    }
  }

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    this.priceForm = this.controlContainer.control as FormGroup<PriceForm>;

    this.addDiscountSub =
      this.priceForm.controls.addDiscount.valueChanges.subscribe((value) => {
        if (value) {
          this.formsService.addControlToForm(
            this.priceForm,
            'discountType',
            DiscountType.amount,
            [Validators.required]
          );
          this.formsService.addControlToForm(
            this.priceForm,
            'rawDiscount',
            null,
            [Validators.required, Validators.min(0)]
          );
        } else {
          this.priceForm.removeControl('discountType');
          this.priceForm.removeControl('rawDiscount');
        }
      });

    this.priceSub = this.priceForm.controls.sellingPrice.valueChanges
      .pipe(debounceTime(200))
      .subscribe(() => this.calculateDiscount());
    this.discountTypeSub = this.priceForm.controls.discountType?.valueChanges
      .pipe(debounceTime(200))
      .subscribe(() => this.calculateDiscount());
    this.rawDiscountSub = this.priceForm.controls.rawDiscount?.valueChanges
      .pipe(debounceTime(200))
      .subscribe(() => this.calculateDiscount());
  }

  ngOnDestroy(): void {
    this.addDiscountSub?.unsubscribe();
    this.priceSub?.unsubscribe();
    this.discountTypeSub?.unsubscribe();
    this.rawDiscountSub?.unsubscribe();
  }

  //---------- Lifecycle methods end ----------
}
