export interface JWTClaims {
  sub: string;
  unique_name: string;
  email: string;
  given_name: string;
  family_name: string;
  role: string;
  exp: number;
}
