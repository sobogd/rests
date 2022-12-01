import React from "react";
import { Button, Typography } from "@mui/material";
import { AlertStyled, TextFieldStyled } from "../styles/common";
import { useAppDispatch, useAppSelector } from "../store";
import { setFormValues } from "../slices/user";
import { AuthorizationForm, AuthorizationContainer } from "../styles/authorization";
import { authorization } from "../services/user";
import Loading from "../shared/loading";

const Authorization: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, isLoading, error } = useAppSelector((s) => s.user);

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormValues({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmitForm = () => {
    dispatch(authorization({ login: form.login.value, password: form.password.value }));
  };

  const handleClickEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitForm();
  };

  return (
    <AuthorizationContainer>
      <AuthorizationForm onSubmit={handleClickEnter}>
        <Loading isLoading={isLoading} />
        <Typography variant="h5" component="h5">
          Authorization
        </Typography>
        {error ? <AlertStyled severity="error">{error}</AlertStyled> : null}
        <TextFieldStyled
          inputProps={{ form: { autocomplete: "off" } }}
          id="login"
          label="Login"
          variant="standard"
          name="login"
          error={!!form.login.error}
          helperText={form.login.error}
          value={form.login.value}
          onChange={handleChangeValues}
        />
        <TextFieldStyled
          id="password"
          name="password"
          label="Password"
          variant="standard"
          type="password"
          error={!!form.password.error}
          helperText={form.password.error}
          value={form.password.value}
          onChange={handleChangeValues}
        />
        <Button variant="contained" onClick={handleSubmitForm}>
          Sign in
        </Button>
      </AuthorizationForm>
    </AuthorizationContainer>
  );
};

export default Authorization;
