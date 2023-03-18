import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  authorization,
  createNewUser,
  getUsersForCompany,
  removeUser,
  updateUserData,
  whoAmI,
} from "shared/api";
import { IUser, IUserState } from "../interfaces";

const initialState: IUserState = {
  data: undefined,
  error: "",
  isLoading: false,
  usersForCompany: [],
  inputtedPassword: "",
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
    signOut: (state: IUserState) => {
      sessionStorage.setItem("token", "");
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
    setPasswordLetter: (
      state: IUserState,
      { payload }: PayloadAction<string>
    ) => {
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
    setFormData: (state: IUserState, { payload }: PayloadAction<IUser>) => {
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
    builder.addCase(authorization.pending, (state: IUserState) => {
      state.isLoading = true;
    });

    builder.addCase(
      authorization.rejected,
      (state: IUserState, { payload }) => {
        state.isLoading = false;
        state.error = payload?.message || "Authorization error";
      }
    );

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
      state.data = undefined;
      state.isLoading = false;
    });

    builder.addCase(
      whoAmI.fulfilled,
      (state: IUserState, action: PayloadAction<IUser>) => {
        const user = action.payload;
        if (user.id) {
          state.data = {
            id: user.id,
            name: user.name,
            type: user.type,
          };
        }
        state.isLoading = false;
      }
    );

    builder.addCase(getUsersForCompany.pending, (state: IUserState) => {
      state.isLoading = true;
    });

    builder.addCase(getUsersForCompany.rejected, (state: IUserState) => {
      state.isLoading = false;
    });

    builder.addCase(
      getUsersForCompany.fulfilled,
      (state: IUserState, action: PayloadAction<IUser[]>) => {
        const users = action.payload;
        state.usersForCompany = users;
        state.isLoading = false;
      }
    );

    builder.addCase(updateUserData.pending, (state: IUserState) => {
      state.isLoading = true;
    });

    builder.addCase(updateUserData.rejected, (state: IUserState) => {
      state.isLoading = false;
      state.form.isSuccess = false;
      state.form.message = "Error with request";
    });

    builder.addCase(
      updateUserData.fulfilled,
      (state: IUserState, { payload }) => {
        state.isLoading = false;
        state.form.isSuccess = payload.isSuccess;
        state.form.message = payload.message || "User was updated!";
      }
    );

    builder.addCase(createNewUser.pending, (state: IUserState) => {
      state.isLoading = true;
    });

    builder.addCase(createNewUser.rejected, (state: IUserState) => {
      state.isLoading = false;
      state.form.isSuccess = false;
      state.form.message = "Error with request";
    });

    builder.addCase(
      createNewUser.fulfilled,
      (state: IUserState, { payload }) => {
        state.isLoading = false;
        state.form.isSuccess = payload.isSuccess;
        state.form.message = payload.message || "User was added!";
      }
    );

    builder.addCase(removeUser.pending, (state: IUserState) => {
      state.isLoading = true;
    });

    builder.addCase(removeUser.rejected, (state: IUserState) => {
      state.isLoading = false;
      state.form.isSuccess = false;
      state.form.isOpenRemove = false;
      state.form.message = "Error with request";
    });

    builder.addCase(removeUser.fulfilled, (state: IUserState, { payload }) => {
      state.isLoading = false;
      state.form.isOpenRemove = false;
      state.form.isSuccess = payload.isSuccess;
      state.form.message = payload.message || "User was removed!";
    });
  },
});
