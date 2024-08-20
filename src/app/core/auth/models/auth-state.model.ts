import { User } from '../../../shared/models/user.model';

export interface AuthState {
  currentUser: User | null | undefined;
  submitting: boolean;
  loading: boolean;
  validationErrors: any | null;
}
