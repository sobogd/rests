import React from "react";
import { AlertStyled } from "../../styles/common";
import { useAppDispatch, useAppSelector } from "../../store";
import { getUsersForCompany } from "../../services/user";
import { Box } from "@mui/system";
import Loading from "../../shared/loading";
import { PasswordInput } from "./PasswordInput";
import { UsersForCompany } from "./UsersForCompany";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, usersForCompany, selectedUser } = useAppSelector((s) => s.user);

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
