import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  ErrorBox,
  NewModalBody,
  NewModalHeader,
  TitleH1,
} from "../../app/styles";
import { LoginBackIconButton } from "./styles";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  authSlice,
  authUserByLoginAndPassword,
  ELoginSteps,
} from "../../entities/auth";
import NumbersInput from "../../shared/NumbersInput";

export const PasswordInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, login, companyLogin } = useAppSelector((s) => s.auth.form);

  const handleFinishInput = (password: string) => {
    dispatch(authUserByLoginAndPassword({ login, password, companyLogin }));
  };

  const handleClickBack = () => {
    dispatch(authSlice.actions.setStep(ELoginSteps.USER));
  };

  return (
    <>
      <NewModalHeader>
        <TitleH1 style={{ justifyContent: "center", textAlign: "center" }}>
          Enter user password
        </TitleH1>
      </NewModalHeader>
      <LoginBackIconButton onClick={handleClickBack}>
        <ArrowBackIcon />
      </LoginBackIconButton>
      <NewModalBody>
        {!!error && (
          <ErrorBox style={{ justifyContent: "center" }}>{error}</ErrorBox>
        )}
        <NumbersInput onFinishInput={handleFinishInput} maxLength={4} />
      </NewModalBody>
    </>
  );
};
