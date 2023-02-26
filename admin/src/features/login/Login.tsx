import React from "react";
import { Box } from "@mui/system";
import Loading from "../../shared/loading";
import { PasswordInput } from "./PasswordInput";
import { UsersForCompany } from "./UsersForCompany";
import { useAppDispatch, useAppSelector } from "app/store";
import { getUsersForCompany } from "shared/api";
import { AlertStyled } from "app/styles";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, usersForCompany, selectedUser } = useAppSelector((s) => s.users);

  React.useEffect(() => {
    dispatch(getUsersForCompany());
  }, []);

  const renderPasswordInput = React.useMemo(() => !!selectedUser && <PasswordInput />, [selectedUser]);

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
      <Loading isLoading={isLoading} />
      {error ? <AlertStyled severity="error">{error}</AlertStyled> : null}
      {renderPasswordInput}
      {renderUsersForCompany}
    </Box>
  );
};
