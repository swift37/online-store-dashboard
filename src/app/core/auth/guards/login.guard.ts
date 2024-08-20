import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser, selectLoading } from '../store/auth.reducer';
import { combineLatestWith, debounceTime, map } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const store: Store = inject(Store);

  return store.select(selectCurrentUser).pipe(
    combineLatestWith(store.select(selectLoading)),
    map(([user, loading]) => {
      return user || loading ? false : true;
    })
  );
};
