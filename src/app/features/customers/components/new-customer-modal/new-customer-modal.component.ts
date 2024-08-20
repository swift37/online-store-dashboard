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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewCustomerForm } from '../../interfaces/new-customer-form.interface';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  animate,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SharedModule } from '../../../../shared/shared.module';
import { ModalBase } from '../../../../shared/interfaces/modal-base.interface';
import { FormsService } from '../../../../core/services/forms-service.service';
import { CustomValidators } from '../../../../shared/models/custom-validators.model';

@Component({
  selector: 'app-new-customer-modal',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './new-customer-modal.component.html',
  styleUrls: [
    '../../../../../styles/new-entity-modal.scss',
    './new-customer-modal.component.scss',
  ],
  animations: [
    trigger('column', [
      transition('void => *', [
        style({
          width: 0,
          overflow: 'hidden',
        }),
        group([
          animate(150, style({ width: '*' })),
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
            width: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class NewCustomerModalComponent implements ModalBase, OnInit, OnDestroy {
  public customerForm!: FormGroup<NewCustomerForm>;
  public addAddressSub?: Subscription;

  @Output() canceled = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>,
    private formsService: FormsService
  ) {}

  public onSubmit(): void {
    this.customerForm.markAllAsTouched();
    if (this.customerForm.valid) {
      this.submitted.emit(this.customerForm.getRawValue());
    }
  }

  public onCancel(): void {
    this.canceled.emit();
  }

  private initForm(): void {
    this.customerForm = new FormGroup<NewCustomerForm>({
      fullName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, CustomValidators.forbiddenNames],
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      addAddress: new FormControl<boolean>(false, { nonNullable: true }),
    });
  }

  //---------- Lifecycle methods start ----------

  ngOnInit() {
    this.initForm();

    this.addAddressSub =
      this.customerForm.controls.addAddress.valueChanges.subscribe((value) =>
        value
          ? this.customerForm.addControl(
              'address',
              this.formsService.createAddressesForm()
            )
          : this.customerForm.removeControl('address')
      );

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

    this.addAddressSub?.unsubscribe();
  }

  //---------- Lifecycle methods end ----------
}
