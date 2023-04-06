import React from "react";
import {
  ButtonStyled,
  NewModalBody,
  NewModalHeader,
  TitleH1,
} from "../../app/styles";
import { LoginBackIconButton } from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IUser } from "../../entities/users";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { authSlice, ELoginSteps } from "../../entities/auth";

export const UsersForCompany: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((s) => s.auth.form);

  const handleClickUserButton = (login: string) => () => {
    dispatch(authSlice.actions.selectUserLogin(login));
  };

  const handleClickBack = () => {
    dispatch(authSlice.actions.setStep(ELoginSteps.LOGIN));
  };

  return (
    <>
      <NewModalHeader>
        <TitleH1 style={{ justifyContent: "center", textAlign: "center" }}>
          Select company user
        </TitleH1>
      </NewModalHeader>
      <LoginBackIconButton onClick={handleClickBack}>
        <ArrowBackIcon />
      </LoginBackIconButton>
      <NewModalBody>
        {users?.map((user: IUser) => (
          <ButtonStyled
            key={user.login}
            onClick={handleClickUserButton(user.login)}
            bottom={10}
          >
            {user.name}
          </ButtonStyled>
        ))}
      </NewModalBody>
    </>
  );
};
