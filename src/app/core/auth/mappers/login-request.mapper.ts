import { LoginRequest } from '../models/login-request.model';

export class LoginRequestMapper {
  public static toDTO(loginRequest: LoginRequest): LoginRequest {
    return {
      usernameOrEmail: loginRequest.usernameOrEmail,
      password: loginRequest.password,
    };
  }
}
