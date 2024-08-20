import { RefreshRequest } from './../services/api/api.client';
import { Injectable } from '@angular/core';
import { Client } from '../services/api/api.client';
import { LoginRequest } from './models/login-request.model';
import { Observable, map, take } from 'rxjs';
import { AuthResponse } from './models/auth-response.model';
import { User } from '../../shared/models/user.model';
import { JWTClaims } from './models/jwt-claims.model';
import { LoginRequestMapper } from './mappers/login-request.mapper';
import { AuthResponseMapper } from './mappers/auth-response.mapper';
import { RefreshRequestMapper } from './mappers/refresh-request.mapper';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: Client, private store: Store) {}

  public login(data: LoginRequest): Observable<AuthResponse> {
    const body = LoginRequestMapper.toDTO(data);
    return this.api
      .login('1.0', body)
      .pipe(map((responseData) => AuthResponseMapper.fromDTO(responseData)));
  }

  public parseUser(data: AuthResponse): User {
    const JWTMiddlePart = data.accessToken?.split('.')[1];
    const decodedJWT = JSON.parse(atob(JWTMiddlePart!));
    const JWTClaims = decodedJWT as JWTClaims;

    return {
      id: JWTClaims.sub,
      username: JWTClaims.unique_name,
      email: JWTClaims.email,
      firstName: JWTClaims.given_name,
      secondName: JWTClaims.family_name,
      tokenExp: new Date(JWTClaims.exp * 1000),
      accessToken: data.accessToken!,
      refreshToken: data.refreshToken!,
    };
  }

  public refreshTokens(data: RefreshRequest): Observable<AuthResponse> {
    const body = RefreshRequestMapper.toDTO(data);
    return this.api
      .refresh('1.0', body)
      .pipe(map((responseData) => AuthResponseMapper.fromDTO(responseData)));
  }

  public logout(): Observable<void> {
    return this.api.logout('1.0');
  }
}
