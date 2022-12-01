export interface AuthorizationResponse {
  id: string;
  name: string;
  type: string;
  token: string;
}

export interface AuthorizationRequest {
  login: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  login?: string;
  password?: string;
  type: string;
}
