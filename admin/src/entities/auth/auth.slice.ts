import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAuthState } from "./auth.types";
import { ELoginSteps } from "./auth.enums";
import { IUser } from "../users";
import {
  authUserByLoginAndPassword,
  getUsersByCompanyLogin,
  whoAmI,
} from "./auth.api";

const initialState: TAuthState = {
  form: {
    companyLogin: "",
    login: "",
    password: "",
    isLoading: false,
    users: [],
    step: ELoginSteps.LOGIN,
    error: "",
  },
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      sessionStorage.setItem("token", "");
      state.user = initialState.user;
    },
    setStep: (state, { payload }: PayloadAction<ELoginSteps>) => {
      state.form.step = payload;
      state.form.error = "";
    },
    setUsers: (state, { payload }: PayloadAction<IUser[]>) => {
      state.form.users = payload;
    },
    selectUserLogin: (state, { payload }: PayloadAction<string>) => {
      state.form.login = payload;
      state.form.step = ELoginSteps.PASSWORD;
    },
    setPassword: (state, { payload }: PayloadAction<string>) => {
      state.form.password = payload;
    },
    setCompanyLogin: (state, { payload }: PayloadAction<string>) => {
      state.form.companyLogin = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersByCompanyLogin.pending, (state: TAuthState) => {
      state.form.isLoading = true;
    });
    builder.addCase(getUsersByCompanyLogin.rejected, (state: TAuthState) => {
      state.form.isLoading = false;
      state.form.error = "Login is incorrect";
    });
    builder.addCase(
      getUsersByCompanyLogin.fulfilled,
      (state: TAuthState, { payload }: PayloadAction<IUser[]>) => {
        state.form.isLoading = false;
        state.form.error = "";
        state.form.users = payload;
        state.form.step = ELoginSteps.USER;
      }
    );
    builder.addCase(authUserByLoginAndPassword.pending, (state: TAuthState) => {
      state.form.isLoading = true;
    });
    builder.addCase(
      authUserByLoginAndPassword.rejected,
      (state: TAuthState) => {
        state.form.isLoading = false;
        state.form.error = "Password is incorrect";
      }
    );
    builder.addCase(
      authUserByLoginAndPassword.fulfilled,
      (state: TAuthState, { payload }: PayloadAction<IUser>) => {
        if (payload?.id && payload?.token) {
          sessionStorage.setItem("token", payload.token);
          state.user = payload;
          state.form = initialState.form;
        }
      }
    );
    builder.addCase(whoAmI.pending, (state: TAuthState) => {
      state.form.isLoading = true;
    });
    builder.addCase(whoAmI.rejected, (state: TAuthState) => {
      sessionStorage.setItem("token", "");
      state.user = undefined;
      state.form.isLoading = false;
    });
    builder.addCase(
      whoAmI.fulfilled,
      (state: TAuthState, { payload }: PayloadAction<IUser>) => {
        if (payload?.id !== state.user?.id) {
          state.user = payload;
        }
        state.form.isLoading = false;
      }
    );
  },
});
