import {
  Component,
  EventEmitter,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { ItemsSearchComponent } from './items-search/items-search.component';
import {
  animate,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { NewOrderForm } from '../../interfaces/new-order-form.interface';
import { SharedModule } from '../../../../shared/shared.module';
import { CurrencyToNumberPipe } from '../../../../shared/pipes/currency-to-number.pipe';
import { ModalBase } from '../../../../shared/interfaces/modal-base.interface';
import { OrderLineData } from '../../../../shared/components/order-line-control/order-line-control.component';
import { FormsService } from '../../../../core/services/forms-service.service';
import { CustomValidators } from '../../../../shared/models/custom-validators.model';

@Component({
  selector: 'app-new-order-modal',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, ItemsSearchComponent],
  templateUrl: './new-order-modal.component.html',
  styleUrls: [
    '../../../../../styles/new-entity-modal.scss',
    './new-order-modal.component.scss',
  ],
  providers: [CurrencyToNumberPipe],
  animations: [
    trigger('form', [transition('void => *', [])]),
    trigger('control', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          overflow: 'hidden',
        }),
        group([
          animate(200, style({ height: '*', opacity: 1 })),
          animate(400, style({ overflow: 'visible' })),
        ]),
      ]),
      transition('* => void', [
        style({
          overflow: 'hidden',
        }),
        animate(
          200,
          style({
            height: 0,
            opacity: 0,
          })
        ),
      ]),
    ]),
    trigger('item', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-150%)',
        }),
        animate(300),
      ]),
      transition('* => void', [
        style({
          overflow: 'hidden',
        }),
        animate(
          300,
          style({
            opacity: 0,
            transform: 'translateY(-150%)',
          })
        ),
      ]),
    ]),
  ],
})
export class NewOrderModalComponent implements ModalBase, OnInit, OnDestroy {
  public orderForm!: FormGroup<NewOrderForm>;

  public itemsTotal: number = 0;

  public get formItems(): FormArray<FormControl<OrderLineData>> {
    return this.orderForm.controls.items;
  }

  @Output() submitted = new EventEmitter();
  @Output() canceled = new EventEmitter<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>,
    private currencyToNumberPipe: CurrencyToNumberPipe,
    private formsService: FormsService
  ) {}

  public onSubmit(): void {
    this.orderForm.markAllAsTouched();
    if (this.orderForm.valid) {
      this.submitted.emit(this.orderForm.getRawValue());
    }
  }

  public onCancel(): void {
    this.canceled.emit();
  }

  public addItem(item: OrderLineData) {
    if (this.formItems.value.includes(item)) return;

    this.formItems.push(
      new FormControl<OrderLineData>(item, {
        nonNullable: true,
      })
    );

    this.calculateTotal();
  }

  public removeItem(index: number) {
    this.formItems.removeAt(index);
    this.calculateTotal();
  }

  public calculateTotal(): void {
    this.itemsTotal = this.formItems.value.reduce((acc, item) => {
      const price: number = this.currencyToNumberPipe.transform(item.itemPrice);
      const subTotal = price * (item.itemQuantity || 1);
      return acc + subTotal;
    }, 0);
  }

  private initForm(): void {
    this.orderForm = new FormGroup<NewOrderForm>({
      userId: new FormControl<string | null>(''),
      fullName: new FormControl<string | null>(
        '',
        CustomValidators.forbiddenNames
      ),
      email: new FormControl<string | null>('', Validators.email),
      phone: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      paymentMethod: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      date: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      time: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      status: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      notes: new FormControl<string | null>(null),
      address: this.formsService.createAddressesForm(),
      items: new FormArray<FormControl<OrderLineData>>(
        [],
        Validators.minLength(1)
      ),
      newUser: new FormControl<boolean>(false, {
        nonNullable: true,
      }),
      useUsersData: new FormControl<boolean>(true, { nonNullable: true }),
    });
  }

  //---------- Lifecycle methods start ----------

  ngOnInit() {
    this.initForm();

    if (isPlatformBrowser(this.platformId)) {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('modal-open');
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('modal-open');
    }
  }

  //---------- Lifecycle methods end ----------
}
