import { RefreshRequest } from './../services/api/api.client';
import { LoginRequest } from './models/login-request.model';
import {
  IdentityResponse,
  LoginRequest as LoginRequestDTO,
} from '../services/api/api.client';
import { AuthResponse } from './models/auth-response.model';

export class AuthMapper {
  public static toDTO(loginRequest: LoginRequest): LoginRequestDTO {
    return {
      usernameOrEmail: loginRequest.usernameOrEmail,
      password: loginRequest.password,
    };
  }

  // public static toDTO(refreshRequest: string): RefreshRequest {
  //   return {
  //     userId: '',
  //     refreshToken: '',
  //   };
  // }

  public static fromDTO(authResponse: IdentityResponse): AuthResponse {
    return {
      accessToken: authResponse.accessToken,
      refreshToken: authResponse.refreshToken,
    };
  }
}
