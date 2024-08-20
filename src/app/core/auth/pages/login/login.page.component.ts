import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectSubmitting,
  selectValidationErrors,
} from '../../store/auth.reducer';
import { authActions } from '../../store/auth.actions';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './login.page.component.html',
  styleUrl: './login.page.component.scss',
})
export class LoginPageComponent {
  public loginForm = new FormGroup({
    usernameOrEmail: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  public data$ = combineLatest({
    submitting: this.store.select(selectSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store) {}

  public onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.store.dispatch(
        authActions.login({ request: this.loginForm.getRawValue() })
      );
    }
  }
}
