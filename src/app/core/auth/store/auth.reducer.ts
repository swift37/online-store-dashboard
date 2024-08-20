import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../models/auth-state.model';
import { authActions } from './auth.actions';

const initialState: AuthState = {
  currentUser: undefined,
  submitting: false,
  loading: true,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.login, (state) => ({
      ...state,
      submitting: true,
      validationErrors: null,
    })),

    on(authActions.authenticationSuccess, (state, action) => ({
      ...state,
      currentUser: action.user,
      loading: false,
      submitting: false,
    })),

    on(authActions.authenticationFailure, (state, action) => ({
      ...state,
      validationErrors: action.error,
      currentUser: null,
      submitting: false,
    })),

    on(authActions.logoutSuccess, (state) => ({
      ...state,
      loading: false,
      currentUser: null,
    })),

    on(authActions.refreshSuccess, (state, action) => ({
      ...state,
      loading: false,
      currentUser: action.user,
    })),

    on(authActions.refreshFailure, (state) => ({
      ...state,
      currentUser: null,
    })),

    on(authActions.fetchUserFailure, (state) => ({
      ...state,
      currentUser: null,
      loading: false,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectCurrentUser,
  selectSubmitting,
  selectLoading,
  selectValidationErrors,
} = authFeature;
