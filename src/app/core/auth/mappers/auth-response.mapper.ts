import { IdentityResponse } from '../../services/api/api.client';
import { AuthResponse } from '../models/auth-response.model';

export class AuthResponseMapper {
  public static fromDTO(authResponse: IdentityResponse): AuthResponse {
    return {
      accessToken: authResponse.accessToken,
      refreshToken: authResponse.refreshToken,
    };
  }
}
