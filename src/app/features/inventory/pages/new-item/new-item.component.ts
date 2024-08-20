import { Component, OnInit } from '@angular/core';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewItemForm } from '../../interfaces/new-item-form.interface';
import { INVENTORY_STATES } from '../../constants/states.const';
import {
  animate,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { PriceForm } from '../../interfaces/price-form.interface';
import { PriceFormComponent } from './components/price-form/price-form.component';
import { ImagesForm } from '../../interfaces/images-form.interface';
import { ImageSnippet } from '../../models/image-snippet.model';
import { SharedModule } from '../../../../shared/shared.module';
import { StatusOption } from '../../../../shared/interfaces/status-option.interface';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [
    SharedModule,
    ReactiveFormsModule,
    PriceFormComponent,
    ImageUploaderComponent,
  ],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss',
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
export class NewItemComponent implements OnInit {
  public newItemForm!: FormGroup<NewItemForm>;
  public priceForm!: FormGroup<PriceForm>;
  public imagesForm!: FormGroup<ImagesForm>;

  public productStates: StatusOption[] = INVENTORY_STATES;

  public get itemSpecs(): FormArray<FormControl<number | null>> {
    return this.newItemForm.controls.specificationIds;
  }

  constructor() {}

  public onSubmit(): void {
    this.newItemForm.markAllAsTouched();
    this.priceForm.markAllAsTouched();
    this.imagesForm.markAllAsTouched();

    if (
      this.newItemForm.valid &&
      this.priceForm.valid &&
      this.imagesForm.valid
    ) {
      console.log(this.newItemForm.getRawValue());
    }
  }

  public onCancel(): void {
    this.newItemForm.reset();
  }

  public addItemSpec() {
    this.itemSpecs.push(
      new FormControl<number | null>(null, Validators.required)
    );
  }

  public removeItemSpec(index: number) {
    this.itemSpecs.removeAt(index);
  }

  private initForms(): void {
    this.newItemForm = new FormGroup<NewItemForm>({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      categoryId: new FormControl<number | null>(null, Validators.required),
      unitsInStock: new FormControl<number | null>(null, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      manufacturer: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      manufacturersCode: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      storeCode: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      description: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      specificationIds: new FormArray<FormControl<number | null>>([]),
      state: new FormControl<number | null>(null, Validators.required),
      isNonReturnable: new FormControl<boolean>(false, {
        nonNullable: true,
        validators: Validators.required,
      }),
      addPublishingDate: new FormControl<boolean>(false, { nonNullable: true }),
      publishingDate: new FormControl<string | null>(null),
      publishingTime: new FormControl<string | null>(null),
      addLabels: new FormControl<boolean>(false, { nonNullable: true }),
      labels: new FormControl<number[]>([], { nonNullable: true }),
    });

    this.priceForm = new FormGroup<PriceForm>({
      sellingPrice: new FormControl<number | null>(null, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      costPrice: new FormControl<number | null>(null, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      addDiscount: new FormControl<boolean>(false, { nonNullable: true }),
      discount: new FormControl<number>(0, {
        nonNullable: true,
        validators: Validators.min(0),
      }),
    });

    this.imagesForm = new FormGroup<ImagesForm>({
      mainImage: new FormControl<ImageSnippet | null>(null),
      addImages: new FormArray<FormControl<ImageSnippet>>([]),
    });
  }

  //---------- Lifecycle methods start ----------

  ngOnInit() {
    this.initForms();
  }

  //---------- Lifecycle methods end ----------
}
