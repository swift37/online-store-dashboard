import { Component } from '@angular/core';
import { ImageSnippet } from '../../../../models/image-snippet.model';
import { ImagesForm } from '../../../../interfaces/images-form.interface';
import {
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { SharedModule } from '../../../../../../shared/shared.module';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss',
})
export class ImageUploaderComponent {
  public imagesForm!: FormGroup<ImagesForm>;

  public get mainImage(): FormControl<ImageSnippet | null> {
    return this.imagesForm.controls.mainImage;
  }

  public get addImages(): FormArray<FormControl<ImageSnippet>> {
    return this.imagesForm.controls.addImages;
  }

  constructor(private controlContainer: ControlContainer) {}

  public uploadMainImage(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imagesForm.controls.mainImage.patchValue(
        new ImageSnippet(e.target.result, file)
      );
    };

    reader.readAsDataURL(file);
  }

  public uploadAddImage(event: any, index: number = -1): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      if (index > -1) {
        this.addImages.controls[index]?.patchValue(
          new ImageSnippet(e.target.result, file)
        );
      } else {
        this.addImages.push(
          new FormControl<ImageSnippet>(
            new ImageSnippet(e.target.result, file),
            {
              nonNullable: true,
            }
          )
        );
      }
    };

    reader.readAsDataURL(file);
  }

  public removeMainImage(): void {
    this.imagesForm.controls.mainImage.patchValue(null);
  }

  public removeAddImage(index: number): void {
    this.addImages.removeAt(index);
  }

  //---------- Lifecycle methods start ----------

  ngOnInit() {
    this.imagesForm = this.controlContainer.control as FormGroup<ImagesForm>;
  }

  //---------- Lifecycle methods end ----------
}
