import { ELoginSteps } from "./auth.enums";
import { IUser } from "../users";

export type TAuthState = {
  form: {
    companyLogin: string;
    login: string;
    password: string;
    step: ELoginSteps;
    users: IUser[];
    isLoading: boolean;
    error: string;
  };
  user?: IUser;
};

export interface ICompany {
  login: string;
  title: string;
}
