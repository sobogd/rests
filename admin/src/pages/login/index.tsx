import React from "react";
import { NewModal, NewModalContainer } from "app/styles";
import { PasswordInput } from "features/login/PasswordInput";
import { UsersForCompany } from "features/login/UsersForCompany";
import { CompanyLogin } from "../../features/login/CompanyLogin";
import { ELoginSteps } from "../../entities/auth";
import { useAppSelector } from "../../app/store";

export const Login: React.FC = () => {
  const { step } = useAppSelector((s) => s.auth.form);

  return (
    <NewModal open={true}>
      <NewModalContainer>
        {step === ELoginSteps.LOGIN && <CompanyLogin />}
        {step === ELoginSteps.USER && <UsersForCompany />}
        {step === ELoginSteps.PASSWORD && <PasswordInput />}
      </NewModalContainer>
    </NewModal>
  );
};
