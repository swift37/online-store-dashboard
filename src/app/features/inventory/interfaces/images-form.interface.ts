import { FormArray, FormControl } from '@angular/forms';
import { ImageSnippet } from '../models/image-snippet.model';

export interface ImagesForm {
  mainImage: FormControl<ImageSnippet | null>;
  addImages: FormArray<FormControl<ImageSnippet>>;
}
