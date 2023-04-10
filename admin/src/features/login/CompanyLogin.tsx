import React from "react";
import { NumbersInput } from "../../shared/ui";
import {
  ErrorBox,
  NewModalBody,
  NewModalFooter,
  NewModalHeader,
  TextLink,
  TitleH1,
} from "../../app/styles";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { authSlice, getUsersByCompanyLogin } from "../../entities/auth";
import { Registration } from "./Registration";

export const CompanyLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, registration } = useAppSelector((s) => s.auth);

  const handleFinishInput = (login: string) => {
    dispatch(getUsersByCompanyLogin(login));
    dispatch(authSlice.actions.setCompanyLogin(login));
  };

  const handleRegisterCompany = () => {
    dispatch(authSlice.actions.toggleIsOpenRegistration());
  };

  return (
    <>
      <NewModalHeader>
        <TitleH1 style={{ justifyContent: "center" }}>
          Enter company login
        </TitleH1>
      </NewModalHeader>
      <NewModalBody>
        {!!form.error && (
          <ErrorBox style={{ justifyContent: "center" }}>{form.error}</ErrorBox>
        )}
        {!registration.isOpenForm && (
          <NumbersInput onFinishInput={handleFinishInput} maxLength={4} />
        )}
      </NewModalBody>
      <NewModalFooter>
        <TextLink
          onClick={handleRegisterCompany}
          style={{ justifyContent: "center" }}
        >
          Register my company..
        </TextLink>
      </NewModalFooter>
      <Registration />
    </>
  );
};
