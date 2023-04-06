import { EUserType } from "../enums";
import { bool } from "yup";

export interface IUsersState {
  usersForCompany: IUser[];
  isLoading: boolean;
  error: string;
  form: IUserStateForm;
}

export interface IUserStateForm {
  isOpen: boolean;
  formData?: IUser;
  message?: string;
  isSuccess?: boolean;
  isOpenRemove: boolean;
}

export interface IUserEditForm {
  name: string;
  type: EUserType;
  newPassword: string;
  userId?: number;
}

export interface IUser {
  id: number;
  name: string;
  type: EUserType;
  login: string;
  token?: string;
  companyId?: number;
}

export interface IUserChangeFields {
  name: string;
  value: string;
}
