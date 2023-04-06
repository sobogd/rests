import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createNewUser,
  getUsersForCompany,
  removeUser,
  updateUserData,
} from "shared/api";
import { IUser, IUsersState } from "../interfaces";

const initialState: IUsersState = {
  error: "",
  isLoading: false,
  usersForCompany: [],
  form: {
    isOpen: false,
    formData: undefined,
    message: "",
    isSuccess: undefined,
    isOpenRemove: false,
  },
};

export const usersModel = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFormData: (state: IUsersState, { payload }: PayloadAction<IUser>) => {
      state.form = {
        ...state.form,
        isOpen: true,
        formData: payload,
      };
    },
    clearFormData: (state) => {
      state.form = {
        ...state.form,
        formData: initialState.form.formData,
        isOpen: false,
      };
    },
    clearFormDataStatus: (state) => {
      state.form = {
        ...state.form,
        isSuccess: undefined,
        message: undefined,
      };
    },
    openEmptyForm: (state) => {
      state.form = {
        ...state.form,
        isOpen: true,
        isSuccess: undefined,
        message: undefined,
      };
    },
    setIsOpenRemove: (state, { payload }) => {
      state.form = {
        ...state.form,
        isOpenRemove: payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersForCompany.pending, (state: IUsersState) => {
      state.isLoading = true;
    });

    builder.addCase(getUsersForCompany.rejected, (state: IUsersState) => {
      state.isLoading = false;
    });

    builder.addCase(
      getUsersForCompany.fulfilled,
      (state: IUsersState, action: PayloadAction<IUser[]>) => {
        const users = action.payload;
        state.usersForCompany = users;
        state.isLoading = false;
      }
    );

    builder.addCase(updateUserData.pending, (state: IUsersState) => {
      state.isLoading = true;
    });

    builder.addCase(updateUserData.rejected, (state: IUsersState) => {
      state.isLoading = false;
      state.form.isSuccess = false;
      state.form.message = "Error with request";
    });

    builder.addCase(
      updateUserData.fulfilled,
      (state: IUsersState, { payload }) => {
        state.isLoading = false;
        state.form.isSuccess = payload.isSuccess;
        state.form.message = payload.message || "User was updated!";
      }
    );

    builder.addCase(createNewUser.pending, (state: IUsersState) => {
      state.isLoading = true;
    });

    builder.addCase(createNewUser.rejected, (state: IUsersState) => {
      state.isLoading = false;
      state.form.isSuccess = false;
      state.form.message = "Error with request";
    });

    builder.addCase(
      createNewUser.fulfilled,
      (state: IUsersState, { payload }) => {
        state.isLoading = false;
        state.form.isSuccess = payload.isSuccess;
        state.form.message = payload.message || "User was added!";
      }
    );

    builder.addCase(removeUser.pending, (state: IUsersState) => {
      state.isLoading = true;
    });

    builder.addCase(removeUser.rejected, (state: IUsersState) => {
      state.isLoading = false;
      state.form.isSuccess = false;
      state.form.isOpenRemove = false;
      state.form.message = "Error with request";
    });

    builder.addCase(removeUser.fulfilled, (state: IUsersState, { payload }) => {
      state.isLoading = false;
      state.form.isOpenRemove = false;
      state.form.isSuccess = payload.isSuccess;
      state.form.message = payload.message || "User was removed!";
    });
  },
});
