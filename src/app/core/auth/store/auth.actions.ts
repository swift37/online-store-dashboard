import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequest } from '../models/login-request.model';
import { User } from '../../../shared/models/user.model';
import { RefreshRequest } from '../models/refresh-request.model';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ request: LoginRequest }>(),
    'Authentication Success': props<{ user: User }>(),
    'Authentication Failure': props<{ error: string }>(),
    Logout: emptyProps(),
    'Logout Success': emptyProps(),
    'Refresh Tokens': props<{ request: RefreshRequest }>(),
    'Refresh Success': props<{ user: User }>(),
    'Refresh Failure': props<{ error: string }>(),
    'Fetch User': emptyProps(),
    'Fetch User Failure': emptyProps(),
  },
});
