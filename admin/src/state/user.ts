import { IUserState } from "../interfaces/user";

export const userState: IUserState = {
  form: {
    login: { value: "", error: "" },
    password: { value: "", error: "" },
  },
  data: undefined,
  error: "",
  isLoading: false,
};
