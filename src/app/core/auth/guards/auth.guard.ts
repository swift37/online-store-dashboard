import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectCurrentUser } from '../store/auth.reducer';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const store: Store = inject(Store);

  return store
    .select(selectCurrentUser)
    .pipe(map((user) => (user ? true : router.createUrlTree(['/login']))));
};
