import { EUserType } from "../enums/user";
import { IFormData } from "./common";

export interface IUserState {
  data?: IUser;
  usersForCompany: IUser[];
  isLoading: boolean;
  error: string;
  selectedUser?: IUser;
  inputtedPassword: string;
}

export interface IUser {
  id: string;
  name: string;
  type: EUserType;
  login?: string;
  token?: string;
}

export interface IUserChangeFields {
  name: string;
  value: string;
}
