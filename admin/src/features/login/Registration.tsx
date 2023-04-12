import React from "react";
import {
  ButtonStyled,
  NewModal,
  NewModalBody,
  NewModalCloseButton,
  NewModalContainer,
  NewModalHeader,
  TitleH1,
} from "../../app/styles";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { authSlice } from "../../entities/auth";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { currencies, languages, timezones } from "../../utils/timezones";

interface Form {
  email: string;
  title: string;
  login: string;
  timezone?: string;
  currency?: { name: string; symbol: string };
  language?: { name: string; code: string };
}

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    // price: yup
    //     .number()
    //     .required("Price is required")
    //     .typeError("Price is required (only numbers)"),
    // sort: yup.number().required().typeError("Sort is required (only numbers)"),
  })
  .required();

export const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { registration } = useAppSelector((s) => s.auth);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Form>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: {
      title: undefined,
    },
  });

  React.useEffect(() => {
    if (!registration.isOpenForm) {
      reset();
    }
  }, [registration.isOpenForm]);

  const handleCloseModal = () => {
    dispatch(authSlice.actions.toggleIsOpenRegistration());
  };

  const onSubmit: SubmitHandler<Form> = (form) => {};

  return (
    <NewModal open={registration.isOpenForm}>
      <NewModalContainer>
        <NewModalHeader>
          <TitleH1 style={{ justifyContent: "center", textAlign: "center" }}>
            Company registration
          </TitleH1>
        </NewModalHeader>
        <NewModalCloseButton onClick={handleCloseModal}>
          <CloseIcon />
        </NewModalCloseButton>
        <NewModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Email"
                  error={!!errors["email"]?.message}
                  helperText={
                    errors["email"]
                      ? errors["email"]?.message?.toString()
                      : "Email for confirmation"
                  }
                  variant="outlined"
                  style={{ marginBottom: 15 }}
                  {...field}
                />
              )}
            />
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Title"
                  error={!!errors["title"]?.message}
                  helperText={
                    errors["title"]
                      ? errors["title"]?.message?.toString()
                      : "Fill the company name"
                  }
                  variant="outlined"
                  style={{ marginBottom: 15 }}
                  {...field}
                />
              )}
            />
            <Controller
              name="login"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Login"
                  error={!!errors["login"]?.message}
                  helperText={
                    errors["login"]
                      ? errors["login"]?.message?.toString()
                      : "Must be contain only 4 numbers"
                  }
                  variant="outlined"
                  style={{ marginBottom: 15 }}
                  {...field}
                />
              )}
            />
            <Controller
              name="timezone"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={timezones}
                  onChange={(e, value) => {
                    field.onChange(value);
                  }}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option: string, value: string) =>
                    option === value
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      label="Timezone"
                      placeholder="Select categories"
                      helperText={
                        errors["timezone"]
                          ? errors["timezone"]?.message?.toString()
                          : "Select timezone of your business"
                      }
                      style={{ marginBottom: 15, marginTop: 0 }}
                      error={!!errors["timezone"]?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={languages}
                  onChange={(e, value) => {
                    field.onChange(value);
                  }}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(
                    option: { name: string; code: string },
                    value: { name: string; code: string }
                  ) => option.code === value.code}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      label="Language"
                      placeholder="Select categories"
                      helperText={
                        errors["language"]
                          ? errors["language"]?.message?.toString()
                          : "Select system language"
                      }
                      style={{ marginBottom: 15, marginTop: 0 }}
                      error={!!errors["language"]?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={currencies}
                  onChange={(e, value) => {
                    field.onChange(value);
                  }}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(
                    option: { name: string; symbol: string },
                    value: { name: string; symbol: string }
                  ) => option.symbol === value.symbol}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      label="Currency"
                      placeholder="Select currency"
                      helperText={
                        errors["currency"]
                          ? errors["currency"]?.message?.toString()
                          : "Select system currency"
                      }
                      style={{ marginBottom: 15, marginTop: 0 }}
                      error={!!errors["currency"]?.message}
                    />
                  )}
                />
              )}
            />
            <ButtonStyled type="submit">Register</ButtonStyled>
          </form>
        </NewModalBody>
      </NewModalContainer>
    </NewModal>
  );
};
