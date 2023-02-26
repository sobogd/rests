import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authorization, getUsersForCompany, whoAmI } from "shared/api";
import { IUser, IUserState } from "../interfaces";

const initialState: IUserState = {
  data: undefined,
  error: "",
  isLoading: false,
  usersForCompany: [],
  inputtedPassword: "",
};

export const usersModel = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state: IUserState) => {
      state.data = undefined;
      state.inputtedPassword = "";
      state.error = "";
      state.selectedUser = undefined;
    },
    setSelectedUser: (state: IUserState, action) => {
      state.selectedUser = action.payload;
      state.error = "";
    },
    removeSelectedUser: (state: IUserState) => {
      state.selectedUser = undefined;
      state.inputtedPassword = "";
      state.error = "";
    },
    setPasswordLetter: (state: IUserState, { payload }: PayloadAction<string>) => {
      if (state.inputtedPassword.length <= 3) {
        state.inputtedPassword = state.inputtedPassword + payload;
        state.error = "";
      }
    },
    removeLastPasswordLetter: (state: IUserState) => {
      state.inputtedPassword = state.inputtedPassword.slice(0, -1);
      state.error = "";
    },
    removePasswordLetters: (state: IUserState) => {
      state.inputtedPassword = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authorization.pending, (state: IUserState) => {
      state.isLoading = true;
    });

    builder.addCase(authorization.rejected, (state: IUserState, { payload }) => {
      state.isLoading = false;
      state.error = payload?.message || "Authorization error";
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

    builder.addCase(getUsersForCompany.pending, (state: IUserState) => {
      state.isLoading = true;
    });

    builder.addCase(getUsersForCompany.rejected, (state: IUserState) => {
      state.isLoading = false;
    });

    builder.addCase(getUsersForCompany.fulfilled, (state: IUserState, action: PayloadAction<IUser[]>) => {
      const users = action.payload;
      state.usersForCompany = users;
      state.isLoading = false;
    });
  },
});
