import { Component, Inject, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { DEFAULT_ERRORS, IDefaultErrors } from './control-errors';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-control-errors',
  templateUrl: './control-errors.component.html',
  styleUrl: './control-errors.component.scss',
  animations: [
    trigger('error', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
        }),
        animate(
          300,
          style({
            height: '*',
            opacity: 1,
          })
        ),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            height: 0,
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class ControlErrorsComponent {
  @Input({ required: true })
  public control!: FormControl;

  constructor(@Inject(DEFAULT_ERRORS) private _defaultErrors: IDefaultErrors) {}

  listErrors(): string[] {
    let currentErrors: string[] = [];

    if (this.control.errors) {
      Object.keys(this.control.errors).forEach((error) => {
        if (this.control.touched) {
          const defError = this._defaultErrors[error as keyof IDefaultErrors]?.(
            this.control.getError(error)
          );

          if (defError) {
            currentErrors.push(defError);
          } else {
            currentErrors.push(this.control.errors![error]);
          }
        }
      });
    }

    return currentErrors;
  }
}
