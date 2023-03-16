import React from "react";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "app/store";
import { getUsersForCompany } from "shared/api";
import { AlertStyled } from "app/styles";
import { PasswordInput } from "features/login/PasswordInput";
import { UsersForCompany } from "features/login/UsersForCompany";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, usersForCompany, selectedUser } = useAppSelector(
    (s) => s.users
  );

  React.useEffect(() => {
    dispatch(getUsersForCompany());
  }, []);

  const renderPasswordInput = React.useMemo(
    () => !!selectedUser && <PasswordInput />,
    [selectedUser]
  );

  const renderUsersForCompany = React.useMemo(
    () => !!usersForCompany?.length && !selectedUser && <UsersForCompany />,
    [usersForCompany, selectedUser]
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={280}
      margin="auto"
      justifyContent="center"
      height="100%"
    >
      {error ? <AlertStyled severity="error">{error}</AlertStyled> : null}
      {renderPasswordInput}
      {renderUsersForCompany}
    </Box>
  );
};
