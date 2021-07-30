export interface LoginCredentials {
  username: string,
  password: string
}

export interface User {
  id: number,
  username: string,
  password: string,
  accessToken: string;
  type: string,
  email: string,
  roles: Array<UserRoles>;
}

export enum UserRoles {
  USER = "ROLE_USER",
  MOD = "ROLE_MODERATOR",
  ADMIN = "ROLE_ADMIN"
}
