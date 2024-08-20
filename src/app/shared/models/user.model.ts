export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  secondName: string;
  accessToken: string;
  tokenExp: Date;
  refreshToken: string;
}
