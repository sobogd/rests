import { EUserType } from "../enums/user";
import { IFormData } from "./common";

export interface IUserState {
  form: IAuthorizationForm;
  data?: IUser;
  isLoading: boolean;
  error: string;
}

export interface IAuthorizationForm {
  login: IFormData;
  password: IFormData;
}

export interface IUser {
  id: string;
  name: string;
  type: EUserType;
  token?: string;
}

export interface IUserChangeFields {
  name: string;
  value: string;
}
