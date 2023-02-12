import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { AlertStyled, TextFieldStyled } from "../styles/common";
import { useAppDispatch, useAppSelector } from "../store";
import { removeSelectedUser, setFormValues, setSelectedUser } from "../slices/user";
import { AuthorizationForm, AuthorizationContainer } from "../styles/authorization";
import { authorization, getUsersForCompany } from "../services/user";
import Loading from "../shared/loading";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { grey, teal } from "@mui/material/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const InputtedLetter = styled.span`
  display: flex;
  background: ${grey[100]};
  border: 2px solid ${teal[800]};
  width: 100%;
  height: 70px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const Authorization: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, isLoading, error, usersForCompany, selectedUser } = useAppSelector((s) => s.user);

  React.useEffect(() => {
    dispatch(getUsersForCompany());
  }, []);

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormValues({ name: e.target.name, value: e.target.value }));
  };

  console.log({ usersForCompany });
  console.log({ selectedUser });

  const handleSubmitForm = () => {
    dispatch(authorization({ login: form.login.value, password: form.password.value }));
  };

  const handleClickEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitForm();
  };

  const inputtedPassword = "0873";

  const renderPasswordInput = React.useMemo(() => {
    return (
      <Box width={250}>
        <Grid container spacing={1} width="100%" margin="auto">
          {[0, 1, 2, 3].map((n) => (
            <Grid item xs={3}>
              <InputtedLetter>
                <Typography color={grey[900]} variant="h6">
                  {inputtedPassword[n]}
                </Typography>
              </InputtedLetter>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }, [inputtedPassword]);

  return (
    <AuthorizationContainer>
      <AuthorizationForm onSubmit={handleClickEnter}>
        <Loading isLoading={isLoading} />
        {error ? <AlertStyled severity="error">{error}</AlertStyled> : null}
        <Grid container>
          <Grid item paddingLeft={1}>
            <ArrowBackIcon onClick={() => dispatch(removeSelectedUser())} />
          </Grid>
          <Grid item paddingLeft={2}>
            <Typography variant="h5">{selectedUser?.name}</Typography>
          </Grid>
        </Grid>
        {!!selectedUser
          ? renderPasswordInput
          : !!usersForCompany?.length &&
            usersForCompany.map((u) => (
              <Button variant="contained" onClick={() => dispatch(setSelectedUser(u))}>
                {u.name}
              </Button>
            ))}
      </AuthorizationForm>
    </AuthorizationContainer>
  );
};

export default Authorization;
