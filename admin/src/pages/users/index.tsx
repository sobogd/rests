import { useAppDispatch, useAppSelector } from "app/store";
import React from "react";
import { UsersList, UsersForm } from "features";
import { pagesModel } from "../../entities/pages";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { usersModel } from "../../entities/users";

export const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((s) => s.users);

  React.useEffect(() => {
    dispatch(
      pagesModel.actions.setHeaderComponent(
        <Box
          display="flex"
          justifyContent="space-between"
          flexGrow={1}
          alignItems="center"
        >
          <Typography variant="h6">
            {form.isOpen ? "User editing" : "Users"}
          </Typography>
          {form.isOpen ? (
            <HighlightOffIcon
              onClick={() => {
                dispatch(pagesModel.actions.setHeaderComponent(undefined));
                dispatch(usersModel.actions.clearFormData());
              }}
            />
          ) : (
            <PersonAddAlt1Icon
              onClick={() => {
                dispatch(usersModel.actions.openEmptyForm());
              }}
            />
          )}
        </Box>
      )
    );
  }, [form]);

  const handleResetForm = () => {
    dispatch(usersModel.actions.clearFormDataStatus());
  };

  return (
    <>
      <Snackbar
        open={form.isSuccess === true || form.isSuccess === false}
        autoHideDuration={6000}
        onClose={handleResetForm}
      >
        <Alert severity={form.isSuccess ? "success" : "error"}>
          {form.message}
        </Alert>
      </Snackbar>
      {form.isOpen ? <UsersForm /> : <UsersList />}
    </>
  );
};
