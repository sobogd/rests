import { useAppDispatch, useAppSelector } from "app/store";
import React, { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { usersModel } from "../../entities/users";
import { UsersFormModal } from "./UsersFormModal";
import { UsersList } from "./UsersList";
import { getUsersForCompany } from "../../api";
import { WrapperScrolled } from "../../app/styles";

export const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((s) => s.users);

  useEffect(() => {
    dispatch(getUsersForCompany());
  }, []);

  const handleResetForm = () => {
    dispatch(usersModel.actions.clearFormDataStatus());
  };

  return (
    <WrapperScrolled>
      <Snackbar
        open={form.isSuccess === true || form.isSuccess === false}
        autoHideDuration={6000}
        onClose={handleResetForm}
      >
        <Alert severity={form.isSuccess ? "success" : "error"}>
          {form.message}
        </Alert>
      </Snackbar>
      <UsersFormModal />
      <UsersList />
    </WrapperScrolled>
  );
};
