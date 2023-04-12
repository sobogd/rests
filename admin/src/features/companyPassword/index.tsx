import React from "react";
import {
  Box,
  Button,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { AlertStyled, MyForm } from "../../app/styles";
import { elementModel } from "../../entities/element/model";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { changeCompanyPassword } from "../../api/companies";
import YouSure from "../../shared/you-sure";
import { companiesModel } from "../../entities/companies/model";

type ICompanyPasswordForm = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

const schema = yup
  .object({
    oldPassword: yup.string().required(),
    newPassword: yup
      .string()
      .matches(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,999})$/i, {
        message: "Minimum eight characters, at least one letter and one number",
      })
      .required(),
    newPasswordRepeat: yup
      .string()
      .matches(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,999})$/i, {
        message: "Minimum eight characters, at least one letter and one number",
      })
      .required()
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  })
  .required();

export const CompanyPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const { changePasswordForm } = useAppSelector((state) => state.companies);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ICompanyPasswordForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const getMessageForError = (message?: string) => {
    if (message === "old_password_incorrect") {
      return "Old password is incorrect";
    }

    return message;
  };

  React.useEffect(() => {
    if (!changePasswordForm?.isSuccess) {
      setError("oldPassword", {
        type: "custom",
        message: getMessageForError(changePasswordForm?.message),
      });
    }
  }, [changePasswordForm]);

  const onSubmit: SubmitHandler<ICompanyPasswordForm> = ({
    oldPassword,
    newPassword,
  }) => {
    dispatch(changeCompanyPassword({ oldPassword, newPassword }));
  };

  const handleResetForm = () => {
    reset({ oldPassword: "", newPassword: "", newPasswordRepeat: "" });
    dispatch(companiesModel.actions.resetChangePasswordForm());
  };

  return (
    <Box>
      <YouSure
        onClickYes={handleResetForm}
        onClickYesText="Ok"
        title="Password was changed"
        isOpen={!!changePasswordForm?.isSuccess}
      />
      <Typography variant="h6" marginBottom={3}>
        Change password of company
      </Typography>
      <MyForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="oldPassword"
          control={control}
          render={({ field }) => (
            <TextField
              label="Old password"
              error={!!errors["oldPassword"]?.message}
              helperText={errors["oldPassword"]?.message?.toString()}
              {...field}
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <TextField
              label="New password"
              error={!!errors["newPassword"]?.message}
              helperText={errors["newPassword"]?.message?.toString()}
              {...field}
            />
          )}
        />
        <Controller
          name="newPasswordRepeat"
          control={control}
          render={({ field }) => (
            <TextField
              label="Repeat new password"
              error={!!errors["newPasswordRepeat"]?.message}
              helperText={errors["newPasswordRepeat"]?.message?.toString()}
              {...field}
            />
          )}
        />
        <Button variant="contained" size="large" type="submit">
          Change company password
        </Button>
      </MyForm>
    </Box>
  );
};
