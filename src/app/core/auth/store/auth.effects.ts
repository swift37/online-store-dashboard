import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { authActions } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { ApiException } from '../../services/api/api.client';
import { PersistanceService } from '../../services/persistence.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { USER } from '../auth.const';

export const login = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((response: AuthResponse) => {
            return authService.parseUser(response);
          }),
          map((user: User) => {
            persistanceService.set(USER, user);
            return authActions.authenticationSuccess({
              user: user,
            });
          }),
          catchError((errorResponse: ApiException) => {
            return of(
              authActions.authenticationFailure({
                error: JSON.parse(errorResponse.response).error,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const authRedirect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.authenticationSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const logout = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      switchMap(() => {
        return authService.logout().pipe(
          map(() => {
            return authActions.logoutSuccess();
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const logoutSuccess = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.logoutSuccess),
      tap(() => {
        persistanceService.remove(USER);
        router.navigateByUrl('/login');
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const refreshTokens = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.refreshTokens),
      switchMap(({ request }) => {
        return authService.refreshTokens(request).pipe(
          map((response: AuthResponse) => {
            return authService.parseUser(response);
          }),
          map((user: User) => {
            persistanceService.set(USER, user);
            return authActions.refreshSuccess({
              user: user,
            });
          }),
          catchError((errorResponse: ApiException) => {
            return of(
              authActions.refreshFailure({
                error: JSON.parse(errorResponse.response).error,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const refreshFailure = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.refreshFailure),
      tap(({ error }) => {
        console.log('[JWT Refresh]: ', error);
        persistanceService.remove(USER);
        router.navigateByUrl('/login');
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const fetchUser = createEffect(
  (
    actions$ = inject(Actions),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.fetchUser),
      map(() => {
        const user = persistanceService.get(USER) as User | null;
        if (!user) {
          return authActions.fetchUserFailure();
        }
        return authActions.authenticationSuccess({ user: user });
      })
    );
  },
  { functional: true }
);
