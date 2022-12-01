import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IErrorWithFields } from "../interfaces/common";
import { IUser, IUserChangeFields, IUserState } from "../interfaces/user";
import { authorization, whoAmI } from "../services/user";
import { userState } from "../state/user";

export const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setFormValues: (state: IUserState, action: PayloadAction<IUserChangeFields>) => {
      const { name, value } = action.payload;
      state.form = {
        ...state.form,
        [name]: { value, error: "" },
      };
      state.error = "";
    },
    signOut: (state: IUserState) => {
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authorization.pending, (state: IUserState) => {
      state.isLoading = true;
    });

    builder.addCase(authorization.rejected, (state: IUserState, { payload }) => {
      state.isLoading = false;

      if (payload?.fields) {
        if (payload.fields?.includes("login")) {
          state.form = {
            ...state.form,
            login: { value: state.form.login.value, error: "No user with this login" },
          };
        }

        if (payload.fields?.includes("password")) {
          state.form = {
            ...state.form,
            password: { value: state.form.password.value, error: "Password is incorrect" },
          };
        }
      }

      if (payload && !payload.fields) {
        state.error = payload.message;
      }
    });

    builder.addCase(authorization.fulfilled, (state: IUserState, action) => {
      const user = action.payload;
      if (user?.id && user?.token) {
        sessionStorage.setItem("token", user.token);
        state.data = {
          id: user.id,
          name: user.name,
          type: user.type,
        };
      }
      state.isLoading = false;
    });

    builder.addCase(whoAmI.pending, (state: IUserState) => {
      state.isLoading = true;
    });

    builder.addCase(whoAmI.rejected, (state: IUserState) => {
      sessionStorage.setItem("token", "");
      console.log("1");
      state.data = undefined;
      state.isLoading = false;
    });

    builder.addCase(whoAmI.fulfilled, (state: IUserState, action: PayloadAction<IUser>) => {
      const user = action.payload;
      if (user.id) {
        state.data = {
          id: user.id,
          name: user.name,
          type: user.type,
        };
      }
      state.isLoading = false;
    });
  },
});

export const { setFormValues, signOut } = userSlice.actions;
