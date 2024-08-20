import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from './store/auth.reducer';
import {
  catchError,
  exhaustMap,
  first,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { PersistanceService } from '../services/persistence.service';
import { authActions } from './store/auth.actions';
import { RefreshRequest } from './models/refresh-request.model';
import { ApiException } from '../services/api/api.client';

export const authHeaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  store = inject(Store)
) => {
  return store.select(selectCurrentUser).pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) return next(req);
      const authToken = user.accessToken;

      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return next(authReq).pipe(
        catchError((err: any) => {
          if (err instanceof ApiException || err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              return of(
                store.dispatch(
                  authActions.refreshTokens({
                    request: new RefreshRequest(user.id, user.refreshToken),
                  })
                )
              ).pipe(
                switchMap(() => store.select(selectCurrentUser)),
                first((user) => user?.accessToken !== authToken),
                switchMap((user) => {
                  const newAuthReq = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${user?.accessToken}`,
                    },
                  });

                  return next(newAuthReq);
                })
              );
            } else {
              console.error('HTTP error: ', err);
            }
          } else {
            console.error('An error occurred: ', err);
          }

          return throwError(() => err);
        })
      );
    })
  );
};
