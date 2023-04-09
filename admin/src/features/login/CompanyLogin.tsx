import React from "react";
import { NumbersInput } from "../../shared/ui";
import {
  ErrorBox,
  NewModalBody,
  NewModalHeader,
  TitleH1,
} from "../../app/styles";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { authSlice, getUsersByCompanyLogin } from "../../entities/auth";

export const CompanyLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((s) => s.auth.form);

  const handleFinishInput = (login: string) => {
    dispatch(getUsersByCompanyLogin(login));
    dispatch(authSlice.actions.setCompanyLogin(login));
  };

  return (
    <>
      <NewModalHeader>
        <TitleH1 style={{ justifyContent: "center" }}>
          Enter company login
        </TitleH1>
      </NewModalHeader>
      <NewModalBody>
        {!!error && (
          <ErrorBox style={{ justifyContent: "center" }}>{error}</ErrorBox>
        )}
        <NumbersInput onFinishInput={handleFinishInput} maxLength={4} />
      </NewModalBody>
    </>
  );
};
